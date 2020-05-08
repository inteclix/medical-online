module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
      unique: 1
    },
    password: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      unique: 1
    },
    permissions: {
      type: Sequelize.STRING, // doctor secretary patient admin
    },
    firstname: {
      type: Sequelize.STRING
    },
    lastname: {
      type: Sequelize.STRING
    },
    civilState: {
      type: Sequelize.STRING
    },
    gender: {
      type: Sequelize.STRING
    },
    dateBirth: {
      type: Sequelize.DATE
    },
    placeBirth: {
      type: Sequelize.STRING
    },
    tel: {
      type: Sequelize.STRING
    },
    img: {
      type: Sequelize.STRING
    },
    mobile: {
      type: Sequelize.STRING,
      unique: 1
    },
    mobileIsVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: 0
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: 1
    },
    is: {
      type: Sequelize.STRING,
      defaultValue: "user"
    }
  });

  return User;
};
