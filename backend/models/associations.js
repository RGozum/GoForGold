const {Sequelize, DataTypes} = require("sequelize");
const sequelize = new Sequelize(
    'goforgolddb',
    'root',
    'root',
    {
        host: 'localhost',
        dialect:'mysql'
    }
);

const Users = require('./Users')(sequelize, DataTypes);
const UserRoles = require('./User_Roles')(sequelize, DataTypes);
const Activities = require('./Activities')(sequelize, DataTypes);
const StudentEnrollment = require('./Student_Enrollment')(sequelize, DataTypes);
const Categories = require('./Categories')(sequelize, DataTypes);
const SchoolYears = require('./School_Years')(sequelize, DataTypes);
const HonorRoll = require('./Honor_Roll')(sequelize, DataTypes);
const HonorList = require('./Honor_List')(sequelize, DataTypes);
const Attendance = require('./Attendance')(sequelize, DataTypes);
const FacultyModerators = require('./Faculty_Moderators')(sequelize, DataTypes);



const defineAssociations = () => {

    //User has one role, User roles belong to many user
    UserRoles.hasMany(Users);
    Users.belongsTo(UserRoles, {
        foreignKey: 'user_role_id',
    });


    //User has many activities,  activities have many users
    Users.belongsToMany(Activities, {
        through: StudentEnrollment,
        foreignKey: 'student_id',
        otherKey: 'activities_id'
    });
    Activities.belongsToMany(Users, 
        {through: StudentEnrollment,
        foreignKey: 'activities_id',
        otherKey: 'student_id'

    });

    Users.belongsToMany(Activities, {
        through: FacultyModerators,
        foreignKey: 'faculty_id',
        otherKey: 'activity_moderating_id'
    });
    Activities.belongsToMany(Users, 
        {through: FacultyModerators,
        foreignKey: 'activity_moderating_id',
        otherKey: 'faculty_id'

    });

    Categories.hasMany(Activities);
    Activities.belongsTo(Categories, {
        foreignKey: 'category_id',
    });

    //Activities have one year, School years have many activities
    Activities.belongsTo(SchoolYears, { foreignKey: 'year_id' });
    SchoolYears.hasMany(Activities, {
        foreignKey: 'year_id',
    });

    //Users can have many honor rolls, Honor rolls go to many students
    Users.belongsToMany(HonorRoll, {
        through: HonorList,
        foreignKey: 'student_id',
        otherKey: 'honor_roll_id'
    });
    HonorRoll.belongsToMany(Users, {
        through: HonorList,
        foreignKey: 'honor_roll_id',
        otherKey: 'student_id'
    });

    Attendance.belongsTo(StudentEnrollment, 
        { foreignKey: 'student_id', 
            as: 'student' });
    Attendance.belongsTo(StudentEnrollment, 
        { foreignKey: 'activity_id', 
            as: 'activity' });

    Users.hasMany(Attendance, { 
        foreignKey: 'student_id' });
    Activities.hasMany(Attendance, { 
        foreignKey: 'activity_id' });

    SchoolYears.hasMany(HonorRoll);
    HonorRoll.belongsTo(SchoolYears, {
        foreignKey: 'year_id_fk'
    });
}

module.exports = (defineAssociations);

