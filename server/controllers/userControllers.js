const { User } = require("../models/userModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const JWT_SECRET = "$ecRet0_";

module.exports.register = async (req, res) => {
  let { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "La contraseña debe tener al menos 6 caracteres" });
  }

  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "El usuario ya existe" });
    }

    let hashedPassword = await bcrypt.hash(password, 10);
    let user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    let savedUser = await user.save();
    res.status(201).json({ data: savedUser });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar el usuario" });
  }
};

module.exports.login = async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Email y contraseña son obligatorios" });
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const payload = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    let token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({
      user: payload,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};

module.exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
