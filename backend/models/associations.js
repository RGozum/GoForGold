
const defineAssociations = (db) => {
    const { Users, User_Role, Activities, Student_Enrollment,
         Categories, SchoolYears, HonorRoll, HonorList, Attendance,
         FacultyModerators} =db;

    //User has one role, User roles belong to many user
    User_Role.hasMany(Users, {
        foreignKey:'user_role_id'
    });
    Users.belongsTo(User_Role, {
        foreignKey: 'user_role_id',
    });


    //User has many activities, activities have many users
    Student_Enrollment.belongsTo(Activities, {
        foreignKey: 'activities_id'
    });
    Student_Enrollment.belongsTo(Users, {
        foreignKey: 'student_id'
    });

    Users.belongsToMany(Activities, {
        through: Student_Enrollment,
        foreignKey: 'student_id',
        otherKey: 'activities_id'
    });
    Activities.belongsToMany(Users, 
        {through: Student_Enrollment,
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

    Categories.hasMany(Activities, {
        foreignKey: 'category_id',
    });
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

    Attendance.belongsTo(Student_Enrollment, 
        { foreignKey: 'student_id', 
            as: 'student' });
    Attendance.belongsTo(Student_Enrollment, 
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

