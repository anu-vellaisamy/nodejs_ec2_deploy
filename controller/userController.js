const Users = require('../model/userSchema');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const register = async(req, res)=>{
    const userData = req.body;
    Users.findOne({email: userData.email})
    .then((user)=>{
        if(user){
      return res.send({message: 'User already exist'})
        }else{
         const hash = bcrypt.hash(userData.password, 10)
           .then((hash)=>{
           Users.create({name: userData.name, email: userData.email, password: hash})
           .then((result)=>{
            return res.json({message: "User registered successfully", data: result})
           })
           })
        }
    }).catch((err)=>{
        return res.send(err)
    })
}

const login = async(req, res)=>{
    const userData = req.body;
    Users.findOne({email: userData.email})
    .then((user)=>{
        if(!user){
            return res.json({message: "User not exists"});
        } else{
                bcrypt.compare(userData.password, user.password, (err, result)=>{
                   if(err){
                       return res.json({message: err})
                   }else{
                    // console.log(hello);
                      const token =  jwt.sign({email: userData.email, name: user.name}, process.env.JWT_TOKEN, {expiresIn: '1d'});
                      res.header('token', token);
                      return res.json({message: "Logged in Successfully", token: token})
                   }
                })}
    }).catch((err)=>{
        return res.json(err)
    })
}

const getAll = async(req, res)=>{
    try{
        const userData = await Users.find({})
        return res.json({message: "All users", data: userData})
    
    }catch{
        return res.json({message: err})
    }

}

const getValById = async(req, res)=>{
    try{
      const {id} = req.body;
      const user = await Users.findById({_id: id});
      return res.json({message: "Get user by Id", data: user})

    }catch{
        return res.json({message: err})

    }
}

const updateUser = async(req, res)=>{
    try{
      const userData = req.body;
      const user = await Users.findByIdAndUpdate(userData.id, userData)
      if(!user){
        return res.json({message: "No such user avilable for that id"})
      }else{
        const getUpdatedData = await Users.findById(userData.id)
        return res.json({message: "Get user by Id", data: getUpdatedData})
      }

    }catch{
        return res.json({message: "err"})

    }
}
const deleteUser = async(req, res)=>{
    try{
      const {id} = req.body;
      const user = await Users.findByIdAndDelete({_id: id});
      return res.json({message: "user deleted successfully"})

    }catch{
        return res.json({message: err})

    }
}

module.exports = {
    register,
    login,
    getAll,
    getValById,
    updateUser,
    deleteUser

}



