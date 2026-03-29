import jwt from "jsonwebtoken";

/**
 * Generate a JWT and set it in an http-only cookie.
 * Also returns a JSON response with the token and user info.
 */
export const generateToken = (res, userId, user, message) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // set token in http-only cookie
  return res
    .cookie("token", token, {
      httpOnly: true,
      secure: true, // set to true in production (requires HTTPS)
      sameSite: "none", // allow cross-site cookies (required for secure cookies)
      maxAge: 3600000, // 1 hour
    })
    .status(200)
    .json({
      success: true,
      message,
      token,
      user,
    });
};
