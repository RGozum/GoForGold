module.exports = (sequelize, DataTypes) => {
    const SchoolYears = sequelize.define("SchoolYears", {
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
    });
    return SchoolYears;

}