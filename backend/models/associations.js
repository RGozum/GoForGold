
const defineAssociations = (db) => {
    const { Users, User_Role, Activities, Student_Enrollment,
         Categories, School_Years, Honor_Roll, Honor_List, Attendance,
         Faculty_Moderators, Student_Grades} =db;

    //User has one role, User roles belong to many user
    User_Role.hasMany(Users, {
        foreignKey:'user_role_id'
    });
    Users.belongsTo(User_Role, {
        foreignKey: 'user_role_id',
    });


    //User has many activities, activities have many users
    Activities.hasMany(Student_Enrollment, {
        foreignKey: 'activities_id',
        sourceKey: 'activity_id',
    });

    Student_Enrollment.belongsTo(Activities, {
        foreignKey: 'activities_id',
        targetKey: 'activity_id',
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
        through: Faculty_Moderators,
        foreignKey: 'faculty_id',
        otherKey: 'activity_moderating_id'
    });
    Activities.belongsToMany(Users, 
        {through: Faculty_Moderators,
        foreignKey: 'activity_moderating_id',
        otherKey: 'faculty_id'

    });

    Faculty_Moderators.belongsTo(Activities, {
        foreignKey: 'activity_moderating_id',
        targetKey: 'activity_id',
    });

    Faculty_Moderators.belongsTo(Users, {
        foreignKey: 'faculty_id',
        targetKey: 'user_id'
    });

    Users.hasMany(Faculty_Moderators, {
        foreignKey: 'faculty_id'
    });

    Categories.hasMany(Activities, {
        foreignKey: 'category_id',
    });
    Activities.belongsTo(Categories, {
        foreignKey: 'category_id',
    });

    //Users can have many honor rolls, Honor rolls go to many students
    Users.belongsToMany(Honor_Roll, {
        through: Honor_List,
        foreignKey: 'student_id',
        otherKey: 'honor_roll_id'
    });
    Honor_Roll.belongsToMany(Users, {
        through: Honor_List,
        foreignKey: 'honor_roll_id',
        otherKey: 'student_id'
    });

    Attendance.belongsTo(Student_Enrollment, 
        { foreignKey: 'student_id', 
            as: 'student' });
    Attendance.belongsTo(Student_Enrollment, 
        { foreignKey: 'activity_id_fk', 
            as: 'activities_id' });

    Users.hasMany(Attendance, { 
        foreignKey: 'student_id' });
    Activities.hasMany(Attendance, { 
        foreignKey: 'activity_id_fk' });

    School_Years.hasMany(Honor_Roll, {
        foreignKey: 'year_id_fk'
    });
    Honor_Roll.belongsTo(School_Years, {
        foreignKey: 'year_id_fk'
    });

    Student_Grades.hasMany(Honor_List, {
        foreignKey: 'grade_id',
    });

    Honor_List.belongsTo(Student_Grades, {
        foreignKey: 'grade_id',
    })
}

module.exports = (defineAssociations);

