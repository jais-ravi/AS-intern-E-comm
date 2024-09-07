const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "please use a valid email address"],
  },
  password: String,
  verifyCode: {
    type: String,
    required: [true, "Verify Code is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  cart: {
    type: Array,
    default: [],
  },
  orders: {
    type: Array,
    default: [],
  },
  contact: Number,
  picture: String,
});

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
