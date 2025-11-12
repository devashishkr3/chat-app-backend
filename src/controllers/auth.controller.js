import User from "../models/user.model.js";
import bcrypt from "bcryptjs";


export const signup = async (req, res) =>{
    try {
        const {email, fullName , password} = req.body;

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
            //jwt
        }else{
            res.status(400).json({
                success : false,
                message: "Invalid User Data",
            })
        }

    } catch (error) {
        
    }
}

export const login = () =>{
resizeBy.send("Login");
}

export const logout = () =>{
resizeBy.send("Logout");
}