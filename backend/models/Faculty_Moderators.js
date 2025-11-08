module.exports = (sequelize, DataTypes) => {
    const Faculty_Moderators = sequelize.define("Faculty_Moderators", {
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
    return Faculty_Moderators;

};