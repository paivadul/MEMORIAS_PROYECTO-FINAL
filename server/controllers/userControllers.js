const { User } = require('../models/userModels');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const JWT_SECRET = "$ecRet0_"

module.exports.register = (req, res) => {
    let userData = req.body
    bcrypt.hash(userData.password, 10, (err, hash) => {
        if (err) {
            res.json({ error: err })
        } else {
            let user = new User({
                ...userData,
                password: hash
            })
            user.save()
                .then((data) => {
                    res.json({ data })
                })
                .catch((error) => {
                    res.json({ error })
                })
        }
    });
}

module.exports.login = async (req, res) => {
    let data = req.body;

    try {
        let user = await User.findOne({ email: data.email })

        let samePassword = await bcrypt.compareSync(data.password, user.password);
        //si la contraseña coincide con la contraseña encriptada en la base de datos
        if (samePassword) {
            const payload = {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName
            }

            //TOKEN: para que cree el Token y refresque en bucle
            let token = jwt.sign(payload, JWT_SECRET, {
                expiresIn: "24h"
            });

            //carga el token y el payload al json (datos del usuario)
            res.json({
                user: payload,
                token,
            })
            //si no coinciden los datos de usuario con la base de datos (datos mal cargados o usuario no registrado)
        } else {
            res.json({ error: 'Usuario y contraseña equivocados' })
        }
    } catch (error) {
        console.error(error)
        res.json({ error: error.toString() })
    }
}

module.exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'user not found' })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};