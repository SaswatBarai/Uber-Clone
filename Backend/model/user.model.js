import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    fullname:{
        firstname: {
            type:String,
            required:true,
            minLength:[3,"First name must be at least 3 characters long"],  
        },
        lastname:{
            type:String,
            required:true,
            minLength:[3,"Last name must be at least 3 characters long"],
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        minLength:[6,"Password must be at least 6 characters long"],
        select:false
    },
    socketId:{
        type:String,
        default:null
    },


},{
    timestamps:true
})

userSchema.methods.genrateAuthToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET);
    return token;
};

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.statics.hashPassword = async (password)=>{
    return await bcrypt.hash(password,10);  
}

const user = mongoose.model("user",userSchema);
export default user;