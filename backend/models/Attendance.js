module.exports = (sequelize, DataTypes) => {
    const Attendance = sequelize.define("Attendance", {
        attendance_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        attendance_date: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'attendance_date'
        },
        activity_id_fk: {
             type: DataTypes.INTEGER,
            allowNull: false,
            field: 'activity_id_fk'
        },
        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }, 
    }, {
        freezeTableName: true,
        tableName: 'attendance',
        timestamps: false
    });
    return Attendance;

};