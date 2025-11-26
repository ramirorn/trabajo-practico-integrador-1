import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";
import { ProfileModel } from "../models/profile.model.js";
import { UserModel } from "../models/user.model.js";
import { matchedData } from "express-validator";

// Registro de un usuario
export const register = async (req,res) => {
    try {
        // Extraer los datos que pasaron las validaciones
        const data = matchedData(req);

        // Hasheo de contraseña
        const hashedPassword = await hashPassword(data.password);

        // Creacion del usuario con los datos validados y la password hasheada
        const user = await UserModel.create({
            username: data.username,
            email: data.email,
            password: hashedPassword,
            role: data.role,
        })

        // Devuelve el usuario creado
        res.status(200).json({
            ok: true,
            message: "Usuario creado con exito",
            usuario: user,
        })
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "Error interno del servidor"
        })
    }
}

// Login de usuario
export const login = async (req,res) => {
    const { username, password } = req.body;
    try {
        // Busca si existe un usuario con ese username
        const user = await UserModel.findOne({where: {username: username}})

        // En caso de que no exista
        if (!user) return res.status(404).json({message: "El usuario no existe"})
        
        // Compara la password recibida con la almacenada
        const isMatch = await comparePassword(password, user.password);

        // Si no coinciden las contraseñas
        if (!isMatch) return res.status(401).json({message: "Contraseña incorrecta"})

        // Generar el token con JWT
        const token = generateToken(user);

        // Enviar el token por las coookies
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
        })

        // Respuesta
        res.status(200).json({ ok: true, message: "Login exitoso", token});
    } catch (err) {
        res.status(500).json({message: "Error interno del servidor"})
    }
}

// Logout de usuario
export const logout = async (req,res) => {
    try {
        // Eliminar el token de las cookies
        res.clearCookie("token")

        // Respuesta
        res.status(200).json({
            ok: true,
            message: "Logout exitoso"
        })
    } catch (err) {
        res.status(500).json({message: "Error interno del servidor"})
    }
}

// Traer perfil del usuario autenticado
export const getAuthProfile = async (req,res) => {
    try {
        // Datos del usuario logueado
        const user = req.usuarioLogueado;

        // Buscar el perfil del usuario
        const profile = await ProfileModel.findByPk(user.id, {
            include: {
                model: UserModel,
                as: "user",
                attributes: { exclude: ["password"]},
            }
        })

        // Si no hay perfil
        if (!profile) return res.status(404).json({
            ok: false,
            message: "Perfil no encontrado"
        })

        // Respuesta
        res.status(200).json({
            ok: true,
            message: "Perfil encontrado",
            perfil: profile,
        })
    } catch (err) {
        res.status(500).json({message: "Error interno del servidor"})
    }
}

// Actualizar el perfil del usuario autenticado
export const updateAuthProfile = async (req,res) => {
    const usuarioLogueado = req.usuarioLogueado;
    try {
        // Extraer los datos que pasaron las validaciones
        const data = matchedData(req);

        // Buscar el perfil del usuario autenticado y actualiza
        const [updatedRows] = await ProfileModel.update(data, {where: {user_id: usuarioLogueado.id}})

        // En caso de que no se haya actualizado nada
        if (updatedRows === 0) return res.status(404).json({
            ok: false,
            message: "Usuario no encontrado o sin cambios"
        })

        // Buscar el perfil ya actualizado
        const updatedProfile = await ProfileModel.findOne({where: { user_id: usuarioLogueado.id}})

        // Respuesta
        res.status(200).json({
            ok: true,
            message: "Usuario actualizado correctamente",
            perfil: updatedProfile,
        })
    } catch (err) {
        res.status(500).json({message: "Error interno del servidor"})
    }
}