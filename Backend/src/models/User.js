import mongoose from 'mongoose';
import validator from 'validator'; // Import validator for email validation
import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email'] // Correct email validation
    },
    password: {
        type: String,
        required: true
    },
    DOB:{
        type: Date,
        required: [true, 'Date of Birth is required'],
        validate: {
            validator: function(value) {
                return new Date() - value > 0;
            },
            message: 'Date of Birth should be in the past'
        }
    }
    
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
    console.log('Hashed password before saving:', this.password);
    
    next();
});



userSchema.methods.comparePassword = async function(userPassword) {
    console.log('User-provided password:', userPassword);
    console.log('Stored hashed password in DB:', this.password);
    
    const isMatch = await bcrypt.compare(userPassword, this.password);
    console.log('Password comparison result:', isMatch);
    return isMatch;
};

userSchema.methods.createJWT = function(){
    return JWT.sign({userId : this._id},process.env.JWT_SECRET,{expiresIn:'1d'})
}
export default mongoose.model("User", userSchema);
