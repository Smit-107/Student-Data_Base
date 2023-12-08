var express = require('express');
var router = express.Router();
var {checkToken} = require('../Middleware/Autho');
const { Login, Register } = require('../Controller/LoginController');

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
router.use(cors(corsOptions));

/* GET home page. */
router.post('/Login',Login);
router.post('/register',Register);


module.exports = router;
