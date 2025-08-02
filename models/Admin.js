module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define("Admin", {
      sn: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [["SUPER ADMIN", "ADMIN", "BURSARY", "SECRETARY"]]
        }
      },
      created_time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }
    }, {
      tableName: "users",
      timestamps: false
    });
  
    return Admin;
  };
  