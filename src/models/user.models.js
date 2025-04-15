import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from"jsonwebtoken";
import crypto from "crypto";


const userSchema = new Schema({

avatar:{
    types:{
        url: String,
        localpath: String
    }, 
    default: {
        url:`ttps://www.img91.com/I2VBoy5GaXC4551`,
        localpath: ""
    }
},
username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index:true
},

email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index:true
},

fullname:{
    type: String,
    required: true,
    
},
password:{
    type: String,
    default: true,
},
isEmailVerified:{
    type: Boolean,
    default: false,
},

forgotPasswordToken:{
    type: String,
    
},
forgotPassword:{
    type: Boolean,
    default: false,
},

forgotPasswordExpiry:{
    type: Date,
},
refreshToken: {
    type: String,
    
},
emailVerificationToken:{
    type: String,
    
},
emailVerificationExpiry:{
    type: Date,
    
},


},{timestamps:true});

userSchema.pre("save", async function(next){
    if(!this.isModified("password") ) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})
userSchema.methods.isPasswordCorrect = async function 
(password){
   return await bcrypt.compare(password, this.password)
}
    
userSchema.methods.generateAccessToken = function () {
    Jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expireIn: process.env.ACCESS_TOKEN_EXPIRY}
    )
}

userSchema.methods.generateRefreshToken = function () {
   return Jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expireIn: process.env.REFRESH_TOKEN_EXPIRY}
    )
}

userSchema.methods.generateTemporaryToken = function(){
    const unHashedToken = crypto.randomBytes(20).toString("hex")

    const hashedToken = crypto.createHash("sha256").update(unHashedToken).digest("hex")
    const tokenExpiry = Date.now() + (20*60*1000) //20min

    return {hashedToken, unHashedToken, tokenExpiry}

}



export const User = mongoose.model("User", userSchema)
