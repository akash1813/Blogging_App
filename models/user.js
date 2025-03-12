const mongoose = require('mongoose');
const {createHmac,randomBytes} = require("crypto");  // use {npm i cryptohash} used for hashing password

const userSchema = new mongoose.Schema({

    fullName : {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt:{
        type: String,
       
    },
    password: {
        type: String,
        required: true,
    },
    profileImageURL:{
        type: String,
        default:"/images/default.png", 

    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default: "USER",
    }
},{timestamps: true});

userSchema.pre("save", function(next){   // when we try to save user this function will run first and hash user password
    const user = this;

    if(!user.isModified("password")) return;

    const salt  = randomBytes(16).toString();    // salt is like a random string/  key which is unique for each user
    const hashedPassword = createHmac("sha256",salt).update(user.password).digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();
})


// virtual function to check or match user password in SignIn page
userSchema.static("matchPassword",async function(email,password){
    
    const user = await this.findOne({email});
    if(!user) throw new Error("User not found!");

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac("sha256",salt).update(password).digest("hex");  // we will hash the password given by the user

    if(hashedPassword!==userProvidedHash) throw new Error("Incorrect Password !");
    return user; // return user object only

})


const User = mongoose.model("user",userSchema);

module.exports = User;