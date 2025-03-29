import userModel from "../models/user.model.js"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
dotenv.config()
const createADmin = async(req, res, next)=>{
    try{
        const{userName, password, email} = req.body
        if(!userName || !password || !email){
            return res.status(400).json({message: "userName, email and password required"})
        }
        const isAuser = await userModel.findOne({email})
        if(isAuser){
            return res.status(403).json({message: "You can not have more thsn one account"})
        }
        let hashedPassword = bcrypt.hashSync(password, 10)
        const newAdminUser = new userModel({userName, password: hashedPassword, email, role: process.env.ADMINHASHEDCODE})
        await newAdminUser.save()
        return res.status(201).json({message: "New admin account created successfully, you can procedd to login"})
    }
    catch(err){
        next(err)
    }
}

export{createADmin}