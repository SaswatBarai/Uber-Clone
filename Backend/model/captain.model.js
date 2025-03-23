import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const captainSchema = new Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minLength: [3, "First name must be at least 3 characters long"]
        },
        lastname: {
            type: String,
            required: true,
            minLength: [3, "Last name must be at least 3 characters long"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "Password must be at least 6 characters long"],
        select: false
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minLength: [3, "Color must be at least 3 characters long"]
        },
        plate: {
            type: String,
            required: true,
            minLength: [3, "Plate must be at least 3 characters long"]
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity must be at least 1"],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ["car", "motorcycle", "auto"],
        }
    },
    location: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
});

// Define methods BEFORE creating the model
captainSchema.methods.generateToken = async function() {
    const token = jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: "24hr"
    });
    return token;
};

captainSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashedPassword = async function(password) {
    return await bcrypt.hash(password, 10);
};

// Create model AFTER defining methods
const captain = mongoose.model("captain", captainSchema);

// Export the model
export default captain;
