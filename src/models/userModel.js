import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true, 
    },
    email: {
        type:String,
        require: true,
    },
    password: {
        type: String,
        require: true,
        unique: true,
    },
    isAdmin:{
        type:String,
        require:true,
        default: false,
    }
},{
    timestamps: true,
})

userSchema.methods.matchPassword = async function (enterPassword){
    return await bcrypt.compare(enterPassword, this.password)
}

const User = new mongoose.model('Users' , userSchema)

export default User;