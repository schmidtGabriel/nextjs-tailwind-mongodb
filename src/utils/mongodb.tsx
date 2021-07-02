import mongoose from 'mongoose'

export const baseURL = 'http://localhost:3000/'
export const header: {} = {
  "Accept" : "application/json",
  "Content-Type": "application/json",
  // "Authentication": `DoNada ${localStorage.getItem('token')}`
}

let uri = process.env.MONGODB_URI
let cachedClient = null

if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}


async function dbConnect() {
  if (cachedClient) {
    console.log("Already CONNECT!")

    return cachedClient
  }

  const client = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((mongoose) =>{
    return mongoose
  })

  cachedClient = await client
  mongoose.Promise = global.Promise;

  console.log("CONNECT!")
  return cachedClient
}

export default dbConnect


