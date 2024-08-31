"use strict";
const { Model, DataTypes } = require("sequelize");

const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize) => {
  class UserFollowers extends Model {
    static associate(models) {
      UserFollowers.belongsTo(models.User, {
        foreignKey: "followerId",
        as: "follower",
      });
      UserFollowers.belongsTo(models.User, {
        foreignKey: "followingId",
        as: "following",
      });
    }
  }

  UserFollowers.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
      },
      followerId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      followingId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "UserFollowers",
      tableName: "user_followers",
      timestamps: false,
    }
  );

  return UserFollowers;
};
