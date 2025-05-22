import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/usersContoller";

const router = express.Router();

router.get("/", getUser);
router.get("/createUser/:id", createUser);
router.get("/update/:id", updateUser);
router.get("/delete/:id", deleteUser);

// how to call userRoutes and import it in anywhere. 
export default router;
