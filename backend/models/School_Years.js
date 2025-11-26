module.exports = (sequelize, DataTypes) => {
    const School_Years = sequelize.define("School_Years", {
        year_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return School_Years;

};