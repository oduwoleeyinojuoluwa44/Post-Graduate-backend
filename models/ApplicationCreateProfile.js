module.exports = (sequelize, DataTypes) => {
  const ApplicationCreateProfile = sequelize.define(
    "ApplicationCreateProfile",
    {
      application_id: { type: DataTypes.STRING, primaryKey: true },
    },
    {
      tableName: "application_create_profile",
      timestamps: false,
    }
  );
  return ApplicationCreateProfile;
};
