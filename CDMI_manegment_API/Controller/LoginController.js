var LoginModel = require('../Model/LoginModel')
var jwt = require('jsonwebtoken')
exports.Login = async(req,res) => {
    try{
        var data = await LoginModel.find({email:req.body.email})
        if(data.length>0)
        {
            if(data[0].password === req.body.password){
                var token = jwt.sign({_id:data[0]._id},"cdmiAPI")
                res.status(200).json({
                    status:'Login Successfully',
                    token
                })
            }
            else{
                res.status(400).json({
                    status:'Password is not Match'
                })
            }
        }
        else
        {
            res.status(400).json({
                status:'Email not Exist'
            })
        }
    }
    catch(error){
        res.status(400).json({
            status:'No internet connection!',
            error:error.message
        })
    }   
}

exports.Register = async(req,res) => {
    try{
        var data = await LoginModel.create(req.body)
        res.status(200).json({
            status:'Admin Add Successfully',
            data
        })
       
    }
    catch(error){
        res.status(400).json({
            status:'No internet connection!',
            error:error.message
        })
    }   
}


