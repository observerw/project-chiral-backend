import path from 'path'

export const staticPath = path.join(process.cwd(), 'dist', 'static')
export const tempFilePath = path.join(staticPath, 'temp')
export const filesPath = path.join(staticPath, 'files')

