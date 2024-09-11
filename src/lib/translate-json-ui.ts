import fs from 'fs'
import path from 'path'
import { sdk } from '@/restoreplus-sdk'
import { googleTranslateApi } from './cloud-translate-api'

const loadJsonFile = (filePath: string): any => {
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  } else {
    console.warn(`File not found: ${filePath}`)
    return null
  }
}

const saveJsonFile = (filePath: string, content: any) => {
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2))
  console.log(`File created: ${filePath}`)
}

export const findNestedChanges = (oldJson: any, newJson: any): any => {
  const changes: any = {}

  const compareObjects = (oldObj: any, newObj: any): any => {
    const objChanges: any = {}

    for (let key in newObj) {
      if (typeof newObj[key] === 'object' && !Array.isArray(newObj[key])) {
        const nestedChanges = compareObjects(oldObj[key] || {}, newObj[key])
        if (Object.keys(nestedChanges).length > 0) {
          objChanges[key] = nestedChanges
        }
      } else if (JSON.stringify(oldObj[key]) !== JSON.stringify(newObj[key])) {
        objChanges[key] = newObj[key]
      }
    }

    return objChanges
  }

  return compareObjects(oldJson, newJson)
}

export const translateText = async (
  text: string,
  targetLang: string
): Promise<string> => {
  const translate = googleTranslateApi
  const [translation] = await translate.translate(text, targetLang)
  return translation
}

export const translateNestedText = async (
  text: any,
  targetLang: string
): Promise<any> => {
  if (typeof text === 'object') {
    const translatedObject: any = {}
    for (const key in text) {
      translatedObject[key] = await translateNestedText(text[key], targetLang)
    }
    return translatedObject
  }
  return await translateText(text, targetLang)
}

export const updateNestedTranslations = async (
  changes: any,
  languages: string[]
): Promise<void> => {
  for (const lang of languages) {
    const langFilePath = path.resolve(
      __dirname,
      `../i18n/dictionaries/${lang}.json`
    )
    let langJson = loadJsonFile(langFilePath)

    if (!langJson) {
      console.log(
        `No existing file for locale ${lang}. Creating and translating...`
      )
      const enFilePath = path.resolve(__dirname, '../i18n/dictionaries/en.json')
      const enJson = loadJsonFile(enFilePath)

      if (enJson) {
        langJson = await translateNestedText(enJson, lang)
      } else {
        console.error(`English file not found at ${enFilePath}`)
        continue
      }
    } else {
      console.log(`Updating existing file for locale ${lang}...`)
      const updatedLangJson = { ...langJson }
      const applyChanges = async (changesObj: any, targetObj: any) => {
        for (const key in changesObj) {
          if (typeof changesObj[key] === 'object') {
            if (!targetObj[key]) targetObj[key] = {}
            await applyChanges(changesObj[key], targetObj[key])
          } else {
            targetObj[key] = await translateNestedText(changesObj[key], lang)
          }
        }
      }
      await applyChanges(changes, updatedLangJson)
      langJson = updatedLangJson
    }

    saveJsonFile(langFilePath, langJson)
  }
}

export const translateChanges = async () => {
  const oldJson = loadJsonFile('../i18n/dictionaries/previous_en.json')
  const newJson = loadJsonFile('../i18n/dictionaries/en.json')

  if (oldJson && newJson) {
    const changes = findNestedChanges(oldJson, newJson)

    if (Object.keys(changes).length > 0) {
      const { data } = await sdk.supportedLocales.getAllByQuery({ take: 100 })
      const languages = data.map((locale: any) => locale.locale)

      await updateNestedTranslations(changes, languages)
      saveJsonFile('../i18n/dictionaries/previous_en.json', newJson)
    } else {
      console.log('No changes detected.')
    }
  } else {
    console.error('Could not load old or new JSON files.')
  }
}
