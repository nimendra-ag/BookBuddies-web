import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  nic: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other']
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

const UserModel = model('Users', userSchema);

export { UserModel };
