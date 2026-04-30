import { nanoid } from "nanoid";

const authMiddleware = async (req, res, next) => {
  let guest = req.cookies?.guest;

  const option = {
    HttpOnly: true,
    Secure: process.env.NODE_ENV === "production",
    SameSite: "Lax",
  };

  if (!guest) {
    guest = nanoid(20);
    res.cookie("guest", guest, option);
  }

  req.guest = guest;

  next();
};

export { authMiddleware };
