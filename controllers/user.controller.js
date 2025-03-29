import bcrypt from "bcrypt"
import userModel from "../models/user.model.js";
import dotenv from "dotenv"

dotenv.config()
const createAccount = async(req, res, next)=>{
  try{
    const{userName, email, password} = req.body
    if(!userName || !email || !password){
      return res.status(403).json({message: "All field are mandatory"})
    }

    const existingUser = await userModel.findOne({email})
    if(existingUser){
      return res.status(403).json({message: "Email has already been taken"})
    }
    
    let hashedPassword = bcrypt.hashSync(password, 10)
    const newUser = new userModel({userName, email, role: process.env.USERHASHEDCODE, password: hashedPassword})
    await newUser.save()
    return res.status(201).json({message: "Account created successful"})
  }
  catch(err){
    next(err)
  }
}

const viewProfile = async(req, res, next)=>{
  try{
    const{id}= req.params
    const user = await userModel.findById(id)
    if(!user){
      return res.status(404).json({message: "No such user"})
    }
    return res.status(200).json({userName: user.userName, email: user.email, _id: user._id})
  }
  catch(err){
    next(err)
  }
}

const viewAllUser = async(req, res, next)=>{
  try{
    const users = await userModel.find()
    if(users.length <= 0){
      return res.status(404).json({message: "No users yet"})
    }
    const profiles = users.map((item)=>{
      return{userName: item.userName, email: item.email, _id: item._id}

    })
    return res.status(200).json(profiles)
  }
  catch(err){
    next(err)
  }
}

const updateProfile = async(req, res, next)=>{
  try{
    const{id}= req.params
    const{email, userName, password}=req.body
    if(!userName || !email || !password){
      return res.status(403).json({message: "All field are mandatory"})
    }

    const existingUser = await userModel.findByid(id)
    if(!existingUser){
      return res.status(404).json({message: "No such user"})
    }
    if(req.user.toString() !== is.toString()){
      return res.status(401).json({message: "You cvan only update your account"})
    }
    const hashedPassword = bcrypt.hashSync(password, 10)
    await userModel.findByIdAndUpdate(
      id,
      {
        $set:{
          email,
          password: hashedPassword,
          userName
        }
      },{new: true}
    )
   return res.status(200).json({message: "Profile update successful"})
  }
  catch(err){
    next(err)
  }
}

const deleteAccount = async(req, res, next)=>{
  try{
    
    const{id}=req.params
    const user = await userModel.findById(id)
    
    if(!user){
      return res.status(404).json({message: "No such user"})
    }
   const{_id, ...others} = user
    const isAdmin = bcrypt.compareSync(process.env.ADMINCODE, req.role)
    if(!isAdmin){
      if(_id.toString() === req.id.toString()){
        await user.deleteOne()
        return res.status(200).json({message: "Account deletion successful"})
      }
      else{
        return res.status(401).json({message: "You can only delete your one account"})
      }
    }
    await user.deleteOne()
    return res.status(200).json({message: "Account deletion successful"})

  }
  catch(err){
    next(err)
  }
}

export {createAccount, viewProfile, viewAllUser,updateProfile, deleteAccount}


