import mongoose, {Mongoose} from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

// Mongoose connection interface
interface MongooseConnection {
  conn:Mongoose | null; // connection
  promise: Promise<Mongoose> | null;
};

// Caching
let cached: MongooseConnection = (global as any).mongoose

// if not cache before, setup cache
if(!cached){
  cached = (global as any).mongoose = {
    conn:null,
    promise: null
  }
}


export const connectionToDatabase = async ()=>{
  if(cached.conn) return cached.conn; // check if there is cached connection, if yes, connect to it and exit

  if(!MONGODB_URL) throw new Error('Missing MONGODB_URL') // If MONGODB_URL is not defined

  // if there is no cached promoise connection, create one and return the conn
  cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {dbName:'ai-image-master', bufferCommands: false});

  cached.conn = await cached.promise;

  return cached.conn;
}

/**
 In other like express application, it might directly connect to mongod within the application only ONCE (server-based)
 but in nextjs, we have to call it for EVERY server action or EACH api request we do becasue nextjs runs on the serverless environment
 serveless = statless, meaning they handle a request and shut down right after without maintaining a comntinues connection to database

 this ensures each connection is handled independently allowing for better scalability
 (no need to manage presisten connections across many instances)

 however, an optimzaion, caching, would be needed as it will result in too many mongodb connections open for each and every action

 */