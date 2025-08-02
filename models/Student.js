module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    "Student",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
      password: { type: DataTypes.STRING, allowNull: false },
      application_id: { type: DataTypes.STRING, allowNull: false, unique: true },
      matric_number: { type: DataTypes.STRING },
    },
    {
      tableName: "students",
      timestamps: false,
    }
  );

  return Student;
};
