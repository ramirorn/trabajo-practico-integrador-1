import bcrypt from "bcrypt";

// Hasheo de contraseña
export const hashPassword = async (password) => {
    const saltRounds = 10; 
    return await bcrypt.hash(password, saltRounds); // Hasheo de la password
}

// Comparacion de contraseña
export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}