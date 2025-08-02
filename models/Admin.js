module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    "Admin",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      staff_id: { type: DataTypes.STRING, allowNull: false, unique: true },
      phone: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
      password: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.STRING, allowNull: false },
      created_time: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_time: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      tableName: "admins",
      timestamps: false,
    }
  );

  return Admin;
};
