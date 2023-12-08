var jwt = require('jsonwebtoken');

const checkToken = async(req,res,next) => {
    jwt.verify(req.headers.authorization,"cdmiAPI",next)
}

module.exports = {checkToken};