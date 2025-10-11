const Users = require('./Users');
const UserRoles=require('./UserRoles');
const Activities= require('./Activities');
const StudentEnrollment = require('./Student_Enrollment');
const Categories = require('./Categories');
const SchoolYears = require('./School_Years');
const HonorRoll = require('./Honor_Roll');
const HonorList = require('./Honor_List');
const Honor_Roll = require('./Honor_Roll');

const defineAssociation= () => {

    //User has one role, User roles belong to many user
    UserRoles.hasMany(User);
    Users.belongsTo(UserRoles, {
        foreignKey: 'user_role_id',
    });


    //User has many activities,  activities have many users
    Users.belongsToMany(Activities, {through: StudentEnrollment});
    Activities.belongsToMany(Users, {through: StudentEnrollment});

    Categories.hasMany(Activities);
    Activities.belongTo(Categories, {
        foreignKey: 'category_id',
    });

    //Activities have one year, School years have many activities
    Activities.belongTo(SchoolYears);
    SchoolYears.hasMany(Activities, {
        foreignKey: 'year_id',
    });

    Users.belongsToMany(HonorRoll, {through: HonorList});
    Honor_Roll

    return defineAssociation;
};
