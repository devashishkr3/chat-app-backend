import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";


export const signup = async (req, res) =>{
    try {
        const {email, fullName , password} = req.body;

        if(!fullName || !email || !password){
            return res.status(400).json({
                success : false,
                message : "All Fields are required",
            })
        }
        if(password.length < 6){
            return res.status(400).json({
                success : false,
                message : "Password must be at least 6 characters."
            })
        }

        const user = await User.findOne({email});

        if(user){
            return res.status(400).json({
                success : false,
                message : "Email already Exist",
            })
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password , salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        })

        if(newUser){
            generateToken(newUser._id, res);
            await newUser.save();

            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })

        }else{
            res.status(400).json({
                success : false,
                message: "Invalid User Data",
            })
        }

    } catch (error) {
        console.log("Signup Error", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        }) 
    }
}

export const login = async (req, res) =>{
    const {email, password} = req.body;
    try {
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message : "All fields are required",
            })
        }
        const existUser = await User.findOne({email});
        if(!existUser){
            return res.status(404).json({
                success: false,
                message: "No user Found with this email",
            })
        }

        const isPassword = bcrypt.compare(existUser.password, password);

        if(!isPassword){
            return res.status(401).json({
                success: false,
                message: "Password mismatched",
            })
        }

        return res.status(200).json({
            success: true,
            
        })

    } catch (error) {
        console.log("Login Error", error.message);
        return res.status(500).json({
            success: false,
            message : "Internal Server Error"
        })
    }
}

export const logout = () =>{
resizeBy.send("Logout");
}