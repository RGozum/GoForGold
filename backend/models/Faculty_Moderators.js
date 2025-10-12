module.exports = (sequelize, DataTypes) => {
    const FacultyModerators = sequelize.define("FacultyModerators", {
        faculty_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        activity_moderating_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }, 
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return FacultyModerators;

};