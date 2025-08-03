module.exports = (sequelize, DataTypes) => {
    const Staff = sequelize.define(
      "Staff",
      {
        staff_id: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
        staff_firstname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        staff_lastname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        staff_middlename: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        college: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        department: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        phone_number: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        staff_category: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        created_time: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updated_time: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        tableName: "staff_tab",
        timestamps: false,
      }
    );
  
    return Staff;
  };
  