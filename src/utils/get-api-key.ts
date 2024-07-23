import 'server-only'

export const getApiKey = (isAdmin: boolean = false) => {
  return isAdmin
    ? { 'x-api-key': process.env.X_API_KEY, 'x-api-key-name': process.env.X_API_KEY_NAME }
    : undefined
}
