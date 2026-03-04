const jwt = require("jsonwebtoken")

async function login (req, res) {
    try {
        const user = req.user;

        const token = jwt.sign(
            { id: user.id },
            "secreto",
            { expiresIn: "30d"}
        )

        return res.send({
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        
    }
}