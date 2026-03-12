const jwt = require("jsonwebtoken")

function authToken() {
    return async (req, res, next) => {
        const token = req.headers.authorization;

        if(!token){
            return res.status(401).send({
                error: "Token não encontrado!"
            })
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            next()
        } catch (error) {
            return res.status(401).send({
                error: "Token inválido!"
            })
        }
    }
}