import mongoose from "mongoose";
import { hashedPassword } from "../utils/HandlePassword.js";
import jwt from "jsonwebtoken";

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
        },
        refresToken: {
            type: String
        }
    },
    { timestamps: true }
)

userSchema.pre("save", async function (next) {
    if ((!this.isModified("password"))) return next();
    this.password = await hashedPassword(this.password)
    next();
});

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        id: this.id,
        username: this.username,
        email: this.email
    }, process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.refreshAccessToken = function () {
    return jwt.sign({
        id: this.id,
    }, process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)