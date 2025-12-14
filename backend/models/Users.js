module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,

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
            unique: true
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
        google_id: {
            type:DataTypes.STRING,
            allowNull:true,
            unique:true,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: true
        },
        token_created_at: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return Users;

};