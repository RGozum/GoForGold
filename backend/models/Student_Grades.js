module.exports = (sequelize, DataTypes) => {
    const Student_Grades = sequelize.define("Student_Grades", {
        grade_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        year_grade: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        grade_name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return Student_Grades;

};