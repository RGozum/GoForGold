module.exports = (sequelize, DataTypes) => {
    const User_Role = sequelize.define("User_Role", {
        user_role_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_role: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return User_Role;

};