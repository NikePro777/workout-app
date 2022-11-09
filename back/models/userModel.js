import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: String,
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    images: {
      before: String,
      after: String,
    },
  },
  {
    minimize: false, // чтобы невведенные данные у пользователя возвращать, даже если они пустые обьекты
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // compare - сравнивать
};

// далее pre - перед сохранением
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    // если пароль не измененный, то мы идем дальше (некст)
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;
