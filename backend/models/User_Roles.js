module.exports = (sequelize, DataTypes) => {
    const UserRoles = sequelize.define("UserRoles", {
        user_role_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
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
    return UserRoles;

};