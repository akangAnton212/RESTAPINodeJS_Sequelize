'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    classroom_id: DataTypes.INTEGER,
    student_name: DataTypes.STRING
  }, {});
  Student.associate = function(models) {
    Student.belongsTo(models.Classroom, {as: 'classroom', foreignKey: 'classroom_id'})
    // Student.belongsToMany(models.Course, {
    //   through: 'StudentCourse',
    //   as: 'courses',
    //   foreignKey: 'student_id'
    // });
  };
  return Student;
};