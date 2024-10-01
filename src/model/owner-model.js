const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
  name: {
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
    required: [true, "Verify Code is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  product: {
    type: Array,
    default: [],
  },
  ownerReview: {
    type: Array,
    default: [],
  },
  shopName: {
    type: String,
  },
  contact: Number,
  picture: String,
});

const ownerModel =
  mongoose.models.owner || mongoose.model("owner", ownerSchema);

export default ownerModel;
