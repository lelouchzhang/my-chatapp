import jwt from "jsonwebtoken";

export function generateJWT(userId, res) {
  // jwt是身份凭证，存储用户的信息
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // cookie是存储机制，保存jwt
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7天, 单位是毫秒
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // 生产环境下启用secure
    sameSite: "strict", // 防止CSRF攻击
  });

  return token; // 返回token以便在需要时使用
}
