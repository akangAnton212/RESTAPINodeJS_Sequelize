var express = require('express');
var router = express.Router();
const classroomController = require('../controllers').classroom;
const studentController = require('../controllers').student;
const lecturerController = require('../controllers').lecturer;
const courseController = require('../controllers').course;

/* ROUTER CLASSROOMS. */
router.get('/api/classroom', classroomController.list);
router.get('/api/classroom/:id', classroomController.getById);
router.post('/api/classroom', classroomController.add);
router.post('/api/update/classroom', classroomController.update);
router.post('/api/delete/classroom/', classroomController.delete);

/* ROUTER STUDENS */
router.get('/api/student', studentController.list);
router.get('/api/student/:id', studentController.getById);
router.post('/api/student', studentController.add);
router.post('/api/update/student/', studentController.update);
router.post('/api/student/:id', studentController.delete);

/* ROUTER LECTURER */
router.get('/api/lecturer', lecturerController.list);
router.get('/api/lecturer/:id', lecturerController.getById);
router.post('/api/lecturer', lecturerController.add);
router.put('/api/lecturer/:id', lecturerController.update);
router.delete('/api/lecturer/:id', lecturerController.delete);

/* ROUTER COURSE */
router.get('/api/course', courseController.list);
router.get('/api/course/:id', courseController.getById);
router.post('/api/course', courseController.add);
router.put('/api/course/:id', courseController.update);
router.delete('/api/course/:id', courseController.delete);

module.exports = router;
