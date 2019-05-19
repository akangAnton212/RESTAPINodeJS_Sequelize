const Student = require('../models').Student;
const Classroom = require('../models').Classroom;
const Course = require('../models').Course;

module.exports = {
  list(req, res) {
    return Student
      .findAll({
        include: [{
          model: Classroom,
          as: 'classroom'
        }],
        order: [
          ['createdAt', 'DESC'],
        ],
      })
      .then((data) => {
        if(data.length > 0){
          const val = data.map((rest) => {
            return {
              id_student: rest.id,
              id_classroom: rest.classroom_id,
              student_name:rest.student_name,
              id_classroom: rest.classroom.id,
              class_name: rest.classroom.class_name
            };
          })

          const response = {
            status: true,
            data: val
          };

          res.status(200).json(response);
        }
      })
      .catch((error) => { 
        const response = {
          status: false,
          data: error
        };
        res.status(400).send(response); 
      });
  },

  getById(req, res) {
    return Student
      .findAll({
        where: {
          id:req.params.id
        },
        include: [{
          model: Classroom,
          as: 'classroom'
        }],
        order: [
          ['createdAt', 'DESC'],
        ],
      })
      .then((data) => {
        if(data.length > 0){
          const val = data.map((rest) => {
            return {
              id_student: rest.id,
              id_classroom: rest.classroom_id,
              student_name:rest.student_name,
              id_classroom: rest.classroom.id,
              class_name: rest.classroom.class_name
            };
          })

          const response = {
            status: true,
            data: val
          };

          res.status(200).json(response);
        }else{
          const response = {
            status: false,
            data: "Data Tidak Ada"
          };

          res.status(404).json(response);
        }
      })
      .catch((error) => {
        const response = {
          status: false,
          data: error
        };
        res.status(400).send(response); 
      });
  },

  add(req, res) {
    return Student
      .create({
        classroom_id: req.body.classroom_id,
        student_name: req.body.student_name,
      })
      .then((data) => {
          res.status(200).json({
            status:true,
            data: "Sukses Input Data",
            result:data
        });
      })
      .catch((error) => {
        res.status(500).json({
          message:"Kesalahan Server",
          error: err
        });
      });
  },

  update(req, res) {
    return Student
      .findAll({
        where: {
          id: req.body.id
        },
        include: [{
          model: Classroom,
          as: 'classroom'
        }],
      })
      .then((data) => {
        if(data.length > 0){
          return Student
          .update({
            student_name: req.body.student_name,
            classroom_id: req.body.classroom_id,
          },{
            where: {
              id:req.body.id
            }
          })
          .then(() => {
            const response = {
              status: true,
              data: "Data Berhasil Di Update"
            };

            res.status(200).json(response);
          })
          .catch((error) => {
            const response = {
              status: false,
              data: error
            };
            res.status(400).send(response); 
          });
        }else{
          const response = {
            status: false,
            data: "Data Tidak Ada"
          };
          res.status(404).json(response);
        }
        
      })
      .catch((error) => {
        const response = {
          status: false,
          data: error
        };
        res.status(400).send(response); 
      });
  },

  delete(req, res) {
    return Student
      .findAll({
        where: {
          id:req.body.id
        }
      })
      .then((data) => {
        if(data.length > 0){
          return Student
          .destroy({
            where :{
              id: req.body.id
            }
          })
          .then(() => {
            const response = {
              status: true,
              data: "data Berhasil Di Hapus"
            };
            res.status(200).json(response); 
          })
          .catch((error) => {
            const response = {
              status: false,
              data: error
            };
            res.status(400).json(response)
          });
        }else{
          const response = {
            status: false,
            data: "Data Tidak Ada"
          };
          res.status(404).json(response)
        }
        
      })
      .catch((error) => {
        const response = {
          status: false,
          data: error
        };
        res.status(400).send(response)
      });
  },
};