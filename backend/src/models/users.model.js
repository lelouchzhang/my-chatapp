import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
      unique: false,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// 遵循mongoose的命名约定，模型名称应该是单数形式+首字母大写，数据库集合名称会自动转换为全小写的复数形式
const User = mongoose.model("User", userSchema);
export default User;
