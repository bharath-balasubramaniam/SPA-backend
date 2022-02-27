const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

// Register
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, contact, password, isAdmin } = req.body;
    if (!name || !password || !contact || !email) {
      res.status(400);
      throw new Error("Please fill all the fields");
    }
    const userExit = await User.findOne({ email: email });
    if (userExit) {
      res.status(400);
      throw new Error("User already exist");
    }
    const user = await User.create({ name, email, password, contact, isAdmin });
    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Email or Password");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});
//  Login
const authUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if user exist
    const user = await User.findOne({ email });
    console.log(user);
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//get All users
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({})
      .find({ _id: { $ne: req.user._id } })
      .select("-password");
    res.status(200).send(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//get a User
const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//update a User
const updateUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    // console.log(user);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      contact: user.contact,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//delete a User
const deleteUser = asyncHandler(async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = {
  registerUser,
  authUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
