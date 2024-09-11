import { Translate } from '@google-cloud/translate/build/src/v2'

export const googleTranslateApi = new Translate({
  projectId: process.env.PROJECT_ID,
  key: process.env.API_KEY,
})
