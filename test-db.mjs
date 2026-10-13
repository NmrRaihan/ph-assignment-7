import dns from 'node:dns'
import { MongoClient } from 'mongodb'
import { readFileSync } from 'fs'

dns.setServers(['8.8.8.8', '1.1.1.1'])

const env = readFileSync('.env.local', 'utf8')
const uri = env
  .split('\n')
  .find((line) => line.startsWith('MONGODB_URI='))
  ?.slice('MONGODB_URI='.length)
  .trim()

new MongoClient(uri, { serverSelectionTimeoutMS: 8000 })
  .connect()
  .then(() => {
    console.log('CONNECTED')
    process.exit(0)
  })
  .catch((e) => {
    console.log('FAILED:', e.message)
    process.exit(1)
  })