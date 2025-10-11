module.exports = (sequelize, DataTypes) => {
    const StudentEnrollment = sequelize.define("StudentEnrollment", {
        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        activities_Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    return StudentEnrollment;

}