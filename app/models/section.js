module.exports = (sequelize, DataTypes) => {
  const Section = sequelize.define('Section', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  });

  return Section;
};
