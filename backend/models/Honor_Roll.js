module.exports = (sequelize, DataTypes) => {
    const HonorRoll = sequelize.define("HonorRoll", {
        honor_roll_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        year_id_fk: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 1,
        }, 
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return HonorRoll;

};