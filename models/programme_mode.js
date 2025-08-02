module.exports = (sequelize, DataTypes) => {
    const ProgrammeMode = sequelize.define("programme_mode", {
      programme_mode_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      programme_mode_name: {
        type: DataTypes.STRING(10),
        allowNull: false
      }
    }, {
      timestamps: false,
      tableName: "programme_mode"
    });
  
    return ProgrammeMode;
  };
  