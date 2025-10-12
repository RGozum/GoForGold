module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email_address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return Users;

};