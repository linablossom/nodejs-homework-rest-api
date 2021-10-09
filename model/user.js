const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const { SECRET_KEY } = process.env;

userSchema.methods.createToken = function () {
  const payload = {
    id: this._id,
  };
  return jwt.sign(payload, SECRET_KEY);
};

const joiUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiUserSchema,
};
