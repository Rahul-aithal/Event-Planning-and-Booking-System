import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true

        },
        password: {
            type: String,
            required: [true, "password is required"],
            minlength: [6, "Password must be at least 6 characters long"], // Example: Minimum password length
            maxlength: [60, "Password is too long"] // Example: Maximum password length for bcrypt hashes
        }
    },
    { timestamps: true }
)


export const User = mongoose.model("User", userSchema)