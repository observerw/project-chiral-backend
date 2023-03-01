import path from 'path'

export const removeFile = (...filePaths: string[]) => `remove-${path.join(...filePaths)}`
