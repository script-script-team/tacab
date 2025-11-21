// Simple in-memory store for refresh token to avoid persisting it to disk/localStorage
// This improves security by keeping the refresh token only for the lifetime of the page
let refreshToken: string | null = null

export const setRefreshToken = (token: string | null) => {
  refreshToken = token
}

export const getRefreshToken = () => refreshToken

export const clearRefreshToken = () => {
  refreshToken = null
}

export default {
  setRefreshToken,
  getRefreshToken,
  clearRefreshToken,
}
