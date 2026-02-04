import { Router } from "express";
import {
  deleteUser,
  getProfile,
  login,
  signUp,
  update,
} from "./auth.service.js";
const router = Router();

router.get("/", (req, res, next) => {
  const result = profile(req.query.id);
  return res.status(200).json({ message: "Profile", result });
});

router.post("/signup", async (req, res, next) => {
  try {
    const result = await signUp(req.body);
    return res.status(200).json({ message: "User Created Successfully" });
  } catch (error) {
    return res.status(404).json({ message: "User Creation Failed" });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const result = await login(req.body);
    return res.status(200).json({ message: "Login Successfully" });
  } catch (error) {
    return res.status(404).json({ message: "Failed to login!" });
  }
});

router.patch("/users", async (req, res, next) => {
  try {
    const result = await update(req.user.userId, req.body);
    return res.status(200).json({ message: "Done Update" });
  } catch (error) {
    return res.status(404).json({ message: "Failed Update" });
  }
});

router.delete("/users", async (req, res, next) => {
  try {
    const result = await deleteUser(req.user.userId);
    return res.status(200).json({ message: "Done Delete" });
  } catch (error) {
    return res.status(404).json({ message: "Failed Delete" });
  }
});

router.get("/profile", async (req, res, next) => {
  try {
    const result = await getProfile(req.user.userId);
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(404).json({ message: "Failed to get profile" });
  }
});

export default router;
