module.exports = (sequelize, Sequelize) => {
  return sequelize.define("clinics", {
    name: {
      type: Sequelize.STRING,
      unique: 1
    },
    description: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    tel: {
      type: Sequelize.STRING
    },
    mobile: {
      type: Sequelize.STRING
    },
    willaya: {
      type: Sequelize.STRING
    },
    town: {
      type: Sequelize.STRING
    },
    logo: {
      type: Sequelize.STRING
    },
    lat: {
      type: Sequelize.FLOAT
    },
    lon: {
      type: Sequelize.FLOAT
    }
  });
};
