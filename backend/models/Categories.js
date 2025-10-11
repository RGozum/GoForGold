module.exports = (sequelize, DataTypes) => {
    const Categories = sequelize.define("Categories", {
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        },

    });
    return Categories;

}