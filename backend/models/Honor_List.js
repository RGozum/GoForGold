module.exports = (sequelize, DataTypes) => {
    const Honor_List = sequelize.define("Honor_List", {
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
        grade_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }, 
        points: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return Honor_List;

};