const { translateChanges } = require('./translate-json-ui')

const runTranslation = async () => {
  try {
    await translateChanges()
    console.log('Translation completed successfully.')
  } catch (error) {
    console.error('Error occurred during translation:', error)
  }
}

runTranslation() // This will run when the script is invoked
