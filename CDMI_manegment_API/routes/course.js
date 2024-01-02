var express = require('express');
var router = express.Router();
var multer = require('multer')
var jwt = require('jsonwebtoken')
var {checkToken} = require('../Middleware/Autho');
const { addCourse, viewCourse, viewsingleCourse, DeleteCourse, updateCourse, ViewallContent, SearchCourse, SearchContent } = require('../Controller/CourseController');
const { addContent, viewsingleContent, updateContent, DeleteContent } = require('../Controller/ContentController');
const {  Addadmission, Student_Detalis, updateStudent_Detalis, allStudent_Detalis, deleteStudent_Detalis, SearchStudent, UpdatecompleteTopic, UpdateStudentstatus } = require('../Controller/AdmissionController');


const cors = require('cors');
const corsOptions ={
    // origin:'http://localhost:3000', 
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
router.use(cors(corsOptions));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  var upload = multer({ storage: storage })
  
// update multer===============
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload1 = multer({ storage: storage })


/* GET home page. */
router.post('/addcourse',checkToken,addCourse);
router.get('/allcourse',checkToken,viewCourse)
router.get('/allcontent',checkToken,ViewallContent)
router.delete('/coursedelete/:id',checkToken,DeleteCourse)
router.delete('/contentdelete/:id',checkToken,DeleteContent)
router.post('/addcontent',checkToken,addContent)
router.get('/viewsinglecourse/:id',checkToken,viewsingleCourse)
router.get('/viewsinglecontent/:id',checkToken,viewsingleContent)
// router.post('/newdmission',upload.single('image'),checkToken,Addadmission,)
router.get('/allstudent_detail',checkToken,allStudent_Detalis)
router.post('/newadmission',upload.single('image'),checkToken,Addadmission,)
router.get('/viewstudentDetail/:id',checkToken,Student_Detalis)
router.put('/updatestudentDetail/:id',upload1.single('image'),checkToken,updateStudent_Detalis)
router.delete('/deletestudentDetail/:id',checkToken,deleteStudent_Detalis)
router.put('/updatecourse',checkToken,updateCourse)
router.put('/updatecontent',checkToken,updateContent)
router.get('/searchcourse',checkToken,SearchCourse)
router.get('/searchcontent',checkToken,SearchContent)
router.get('/searchstudentdetails',checkToken,SearchStudent)
router.put('/updatecompletetopic',checkToken,UpdatecompleteTopic)
router.put('/updatestudentstatus',checkToken,UpdateStudentstatus)

module.exports = router;
