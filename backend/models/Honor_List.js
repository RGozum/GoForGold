module.exports = (sequelize, DataTypes) => {
    const HonorList = sequelize.define("HonorList", {
        honor_list_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        honor_roll_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quarter: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        grade: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    });
    return HonorList;

}