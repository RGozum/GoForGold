module.exports = (sequelize, DataTypes) => {
    const Attendance = sequelize.define("Attendance", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        activity_id_fk: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    });
    return Attendance;

}