import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  const token = jwt.sign(
    {
      userId: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
  // set token in http-only cookie
  return res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000, // 1 hour
    })
    .status(200)
    .json({
      success: true,
      message,
      token,
      //   user: { _id: user._id, username: user.username, email: user.email },
      user,
    });
};
