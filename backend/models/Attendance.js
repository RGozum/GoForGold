module.exports = (sequelize, DataTypes) => {
    const Attendance = sequelize.define("Attendance", {
        attendance_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            field: 'attendance_date',
            primaryKey: true
        },
        activity_id_fk: {
             type: DataTypes.INTEGER,
            allowNull: false,
            field: 'activity_id_fk',
            primaryKey: true
        },
        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        }, 
    }, {
        freezeTableName: true,
        tableName: 'attendance',
        timestamps: false
    });
    return Attendance;
};