module.exports = (sequelize, DataTypes) => {
    const Activities = sequelize.define("Activities", {
        activity_id: {
            type: DataTypes.INTEGER,
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
        
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return Activities;

};