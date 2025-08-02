module.exports = (sequelize, DataTypes) => {
    const PgStudent = sequelize.define("pg_student", {
      student_id: {
        type: DataTypes.STRING(20),
        primaryKey: true,
      },
      application_id: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      department_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      program_type_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      course_of_study_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      college_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      document_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      country_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      state_of_origin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      passport: {
        type: DataTypes.BLOB("long"),
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      middle_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING(6),
        allowNull: false,
      },
      date_of_birth: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      email_address: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING(20),
      },
      religion: {
        type: DataTypes.STRING(20),
      },
      postal_address: {
        type: DataTypes.TEXT,
      },
      home_address: {
        type: DataTypes.TEXT,
      },
      language_proficiency: {
        type: DataTypes.TEXT,
      },
      health_disability: {
        type: DataTypes.TEXT,
      },
      study_plan: {
        type: DataTypes.TEXT,
      },
      currently_enrolled_elsewhere: {
        type: DataTypes.BOOLEAN,
      },
      current_programme_details: {
        type: DataTypes.TEXT,
      },
      occupation_since_last_programme: {
        type: DataTypes.TEXT,
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
      timestamps: false,
      tableName: "pg_student"
    });
  
    return PgStudent;
  };
  