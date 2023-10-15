import fs from 'fs'
import path from 'path';

export default async function getStaticSchedulePath() {
  const schedulepath = path.join(process.cwd(), 'public', 'static_schedule')
  const dir = fs.readdirSync(schedulepath)
  if (dir.length) {
    return `/static_schedule/${dir[0]}`
  }

  return '/'
}