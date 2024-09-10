export const remoteUrl =
  process.env.NEXT_PUBLIC_NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : process.env.NEXT_PUBLIC_REMOTE_URL

export const serverUrl =
  process.env.NEXT_PUBLIC_NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_SERVER_URL
