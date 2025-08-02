module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define("Payment", {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      application_id: { type: DataTypes.STRING, allowNull: false },
      payment_type: {
        type: DataTypes.ENUM("application_form", "acceptance_form", "school_fee"),
        allowNull: false,
      },
      receipt_filename: { type: DataTypes.STRING, allowNull: false },
      status: {
        type: DataTypes.ENUM("pending", "approved", "rejected"),
        defaultValue: "pending",
      },
      reviewed_by: { type: DataTypes.STRING },
      reviewed_at: { type: DataTypes.DATE },
    });
  
    // Associations go here
    Payment.associate = (models) => {
      if (models.ApplicationCreateProfile) {
        Payment.belongsTo(models.ApplicationCreateProfile, {
          foreignKey: "application_id",
          targetKey: "application_id",
        });
      }

      if (models.StaffTab) {
        Payment.belongsTo(models.StaffTab, {
          foreignKey: "reviewed_by",
          targetKey: "staff_id",
        });
      }
    };
  
    return Payment;
  };
  