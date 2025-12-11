module.exports = (sequelize, DataTypes) => {
    const Student_Enrollment = sequelize.define("Student_Enrollment", {
        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        activities_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }, 

        approved: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null,
        },
        points: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return Student_Enrollment;

};