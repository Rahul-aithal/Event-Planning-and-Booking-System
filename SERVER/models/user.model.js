import mongoose from "mongoose";
import { hashedPassword } from "../utils/HandlePassword.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env"

});

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
        refreshToken: {
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

userSchema.methods.generateAccessToken =  function () {
    try {
        const token =  jwt.sign({
            id: this._id,
        }, process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )
        return token
    }
    catch (error) {
        console.log(error);
        throw new Error(error, "in generateAccessToken")
    }
}

userSchema.methods.generaterefreshToken =  function () {
    try {
        const token =  jwt.sign({
            id: this._id,
        }, process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }
        )
        return token
    }
    catch (error) {
        console.log(error);
        throw new Error(error, "in refreshAccessToken")
    }
}

export const User = mongoose.model("User", userSchema)