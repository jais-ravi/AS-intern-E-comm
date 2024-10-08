const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      minLength: 2,
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
      // required: [true, "Verify Code is required"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifyCodeExpiry: {
      type: Date,
      default: new Date(Date.now() + 10 * 60 * 1000).toUTCString(),
      required: [true, "Verify Code Expiry is required"],
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
  },
  { collection: "myusers" }
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
