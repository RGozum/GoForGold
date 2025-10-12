
module.exports = (sequelize, DataTypes) => {
    const Categories = sequelize.define('Categories', {
        category_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        category_name: {
            type: DataTypes.STRING,
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
    return Categories;
};