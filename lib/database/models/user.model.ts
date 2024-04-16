import {Schema, model, models} from "mongoose";


// clerkId, email, user, photo, first, lastname, planId, creditBalance
// interface
// export interface IUser extends Document {
//   clerkId: string;
//   email: string;
//   username: string;
//   photo: string;
//   firstName: string;
//   lastName: string;
//   planId: Number;
//   creditBalance: Number;
// }



// schema

const UserSchema = new Schema({
  clerkId: {type: String, required: true,unique: true},
  email: {type: String, required: true,unique: true},
  username: {type: String, required: true,unique: true},
  photo: {type: String, required: true},
  firstName: {type: String},
  lastName: {type: String},
  planId: {type: Number, default: 1},
  creditBalance: {type: Number, default: 10},
})

const User = models?.User || model('User', UserSchema)

export default User;