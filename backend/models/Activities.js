module.exports = (sequelize, DataTypes) => {
    const Activities = sequelize.define("Activities", {
        activity_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        activity_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        year_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }, 
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return Activities;

};