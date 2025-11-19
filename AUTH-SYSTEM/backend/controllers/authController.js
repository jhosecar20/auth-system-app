const { User } = require("../shared/utils");
const bcrypt = require("bcrypt");
const { generateToken } = require("../shared/utils/jwt");

// Registro de usuario
const register = async (req, res) => {
  try {
    const { username, email, password, documentNumber } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        message: "El usuario ya existe",
        timestamp: new Date().toISOString(),
        status: "error",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      documentNumber,
      isActive: true,
    });

    const token = generateToken({ userId: newUser.id, version: "vl" });

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      timestamp: new Date().toISOString(),
      status: "success",
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({
      message: "Error interno del servidor",
      timestamp: new Date().toISOString(),
      status: "error",
    });
  }
};

// Login de usuario
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email, isActive: true },
    });

    if (!user) {
      return res.status(401).json({
        message: "Email o contraseña inválida",
        status: "error",
      });
    }

    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return res.status(401).json({
        message: "Email o contraseña inválida",
        status: "error",
      });
    }

    const tokenJWT = generateToken({ userId: user.id, version: "vl" });

    res.json({
      status: "success",
      message: "Login exitoso",
      timestamp: new Date().toISOString(),
      token: tokenJWT,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({
      message: "Error interno",
      status: "error",
    });
  }
};

module.exports = {
  register,
  login,
};