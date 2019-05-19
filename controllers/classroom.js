const Classroom = require('../models').Classroom;
const Student = require('../models').Student;


module.exports = {
  list(req, res) {
    return Classroom
      .findAll({
        include: [{
          model: Student,
          as: 'students'
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: Student, as: 'students' }, 'createdAt', 'DESC'],
        ],
      })
      .then(data => {
        if(data.length > 0){
          const val = data.map((rest) => {
              return {
                  id_class: rest.id,
                  class_name:rest.class_name,
                  studens: rest.students.map((val) => {
                    return {
                      student_id:val.id,
                      student_name:val.student_name
                    }
                  })
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
    var response = "";
    return Classroom
      .findAll({
        where:{
          id:req.params.id
        },
        include: [{
          model: Student,
          as: 'students'
        }],
      })
      .then((data) => {
        if(data.length > 0){
          const val = data.map((rest) => {
              return {
                  id_class: rest.id,
                  class_name:rest.class_name,
                  studens: rest.students.map((val) => {
                    return {
                      student_id:val.id,
                      student_name:val.student_name
                    }
                  })
              };
          })

          response = {
            status: true,
            data: val
          };

          
        }else{
          response = {
            status: false,
            data: "Data Tidak Ada"
          };
        }
        res.status(200).json(response);
      })
      .catch((error) => { 
        response = {
            status: false,
            data: error
        };
        res.status(400).send(response); 
      });
  },

  add(req, res) {
    
    return Classroom
      .create({
        class_name: req.body.class_name,
      })
      .then((data) => {
        res.status(200).json({
            status:true,
            data: "Sukses Input Data",
            result:data
        });
      })
      .catch((err) => {
        res.status(500).json({
          message:"Kesalahan Server",
          error: err
        });
      });

    // return sequelize.transaction().then(t => {
      // return Classroom.create({
      //   class_name: req.body.class_name,
      // }).then((data) => {
    //     t.commit();
        // res.status(200).json({
        //     status:true,
        //     data: "Sukses Input Data",
        //     result:data
        // });
      // }).catch((err) => {
      //   t.rollback();
      //   res.status(500).json({
      //     message:"Kesalahan Server",
      //     error: err
      //   });
      // });
    // });
  },

  update(req, res) {
    return Classroom
      .findAll({
        where: {
          id:req.body.id, 
        },
        include: [{
          model: Student,
          as: 'students'
        }],
      })
      .then((data) => {
        if(data.length > 0) {
          return Classroom
          .update({
            class_name: req.body.class_name,
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
    return Classroom
      .findAll({
        where:{
          id: req.body.id
        }
      })
      .then((data) => {
        if(data.length > 0){
          return Classroom
            .destroy({
              where:{
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