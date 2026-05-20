const cookieOptions = {
  HttpOnly: true,
  Secure: process.env.NODE_ENV === "production",
  SameSite: "Lax",
};

export { cookieOptions };
