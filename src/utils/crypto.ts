import * as crypto from 'crypto'

export const generateSalt = () => crypto.randomUUID()

export const encryptPassword = (password: string, salt: string): string => {
  if (!password || !salt) { return '' }
  const tempSalt = Buffer.from(salt, 'base64')
  return crypto.pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1').toString('base64')
}
