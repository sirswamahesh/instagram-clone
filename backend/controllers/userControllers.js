const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const getDataUri = require("../utils/datauri");
const cloudinary = require("../utils/cloudinary");
const { Sequelize, where } = require("sequelize");
const { getReceiverSocketId, io } = require("../app");
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(401).json({
        message: "Something is missing, please check!",
        success: false,
      });
    }

    const user = await db.User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      return res.status(401).json({
        message: "Try different email",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "Something is missing, please check!",
        success: false,
      });
    }
    const user = await db.User.findOne({
      where: { email },
      include: [
        {
          model: db.Post,
          as: "posts",
          order: [["createdAt", "DESC"]],
        },
        {
          model: db.Bookmark,
          as: "bookmarks",
          include: [
            {
              model: db.Post,
              as: "post",
            },
          ],
        },
        {
          model: db.UserFollowers,
          as: "following",
          attributes: ["followingId"],
        },
        {
          model: db.UserFollowers,
          as: "followers",
          attributes: ["followerId"],
        },
      ],
    });
    if (!user) {
      return res.status(401).json({
        message: "User not exists",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    const formattedUser = {
      ...user.toJSON(),
      password: undefined,
      bookmarks: user.bookmarks.map((bookmark) => bookmark.post),
      followers: user.followers.map((f) => f.followerId),
      following: user.following.map((f) => f.followingId),
    };
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: `Welcome back ${user.username}`,
        success: true,
        user: formattedUser,
      });
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req, res) => {
  try {
    return res.cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await db.User.findOne({
      where: { id: userId },
      attributes: { exclude: ["password"] },
      include: [
        {
          model: db.Post,
          as: "posts",
          order: [["createdAt", "DESC"]],
        },
        {
          model: db.Bookmark,
          as: "bookmarks",
          // attributes: {
          //   include: ["posts"],
          // },
          include: [
            {
              model: db.Post,
              as: "post",
            },
          ],
        },
        {
          model: db.UserFollowers,
          as: "following",
          attributes: ["followingId"],
        },
        {
          model: db.UserFollowers,
          as: "followers",
          attributes: ["followerId"],
        },
      ],
    });
    const formattedUser = {
      ...user.toJSON(),
      bookmarks: user.bookmarks.map((bookmark) => bookmark.post),
      followers: user.followers.map((f) => f.followerId),
      following: user.following.map((f) => f.followingId),
    };
    return res.status(200).json({
      user: formattedUser,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const editProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { bio, gender } = req.body;
    const profilePicture = req.file;
    let cloudResponse;

    if (profilePicture) {
      const fileUri = getDataUri(profilePicture);
      cloudResponse = await cloudinary.uploader.upload(fileUri);
    }

    const user = await db.User.findOne({
      where: { id: userId },
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }
    if (bio) user.bio = bio;
    if (gender) user.gender = gender;
    if (profilePicture) user.profilePicture = cloudResponse.secure_url;

    await user.save();

    return res.status(200).json({
      message: "Profile updated.",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSuggestedUsers = async (req, res) => {
  try {
    const suggestedUsers = await db.User.findAll({
      where: {
        id: {
          [Sequelize.Op.ne]: req.id,
        },
      },
      attributes: { exclude: ["password"] },
    });
    if (suggestedUsers.length <= 0) {
      return res.status(400).json({
        message: "Currently do not have any users",
      });
    }
    return res.status(200).json({
      success: true,
      users: suggestedUsers,
    });
  } catch (error) {
    console.log(error);
  }
};

const followOrUnfollow = async (req, res) => {
  try {
    const followKrneWala = req.id; // mahesh
    const jiskoFollowKrunga = req.params.id; // test

    if (followKrneWala === jiskoFollowKrunga) {
      return res.status(400).json({
        message: "You cannot follow/unfollow yourself",
        success: false,
      });
    }

    const user = await db.User.findOne({
      where: { id: followKrneWala },
      include: [
        {
          model: db.UserFollowers,
          as: "following",
          attributes: ["followingId"],
        },
        {
          model: db.UserFollowers,
          as: "followers",
          attributes: ["followerId"],
        },
      ],
    });

    const targetUser = await db.User.findOne({
      where: { id: jiskoFollowKrunga },
      include: [
        {
          model: db.UserFollowers,
          as: "following",
          attributes: ["followingId"],
        },
        {
          model: db.UserFollowers,
          as: "followers",
          attributes: ["followerId"],
        },
      ],
    });

    if (!user || !targetUser) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    const isFollowing = user.following.some(
      (f) => f.followingId === jiskoFollowKrunga
    );

    if (isFollowing) {
      await db.UserFollowers.destroy({
        where: {
          followerId: followKrneWala,
          followingId: jiskoFollowKrunga,
        },
      });

      return res.status(200).json({
        message: "Unfollowed successfully",
        success: true,
      });
    } else {
      await db.UserFollowers.create({
        followerId: followKrneWala,
        followingId: jiskoFollowKrunga,
      });

      const receiverSocketId = getReceiverSocketId(jiskoFollowKrunga);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("followNotifaction", {
          username: user.username,
          userProfile: user.profilePicture,
          seen: false,
          createdAt: new Date(),
        });
      }
      return res.status(200).json({
        message: "Followed successfully",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

module.exports = {
  register,
  login,
  logout,
  getProfile,
  editProfile,
  getSuggestedUsers,
  followOrUnfollow,
};
