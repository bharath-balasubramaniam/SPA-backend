const express = require("express");
const {
  registerUser,
  authUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");
const { ifAdmin, ifAuth, ifMatch } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);
router.get("/", ifAdmin, getAllUsers);
router.get("/:id", ifAuth, getUser);
router.put("/:id", ifAuth, ifMatch, updateUser);
router.delete("/:id", ifAuth, ifMatch, deleteUser);

module.exports = router;
