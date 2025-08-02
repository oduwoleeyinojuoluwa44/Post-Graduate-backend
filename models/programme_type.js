module.exports = (sequelize, DataTypes) => {
    const ProgrammeType = sequelize.define("programme_type", {
      program_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      program_name: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
    }, {
      timestamps: false,
      tableName: "programme_type"
    });
  
    return ProgrammeType;
  };
  