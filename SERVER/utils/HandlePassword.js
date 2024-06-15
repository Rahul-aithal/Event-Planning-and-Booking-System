import bcrypt from "bcrypt";

export const hashedPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    }
    catch (err) {
        throw new Error("Error hashing password: " + err.message);
    }

}


export const comparePassword  = (newPassword, userPassword) => {
    try {
        const result = bcrypt.compareSync(newPassword, userPassword);

        return result;
    } catch (error) {
        throw new Error("Error Comparing password: " + error.message);
    }
}