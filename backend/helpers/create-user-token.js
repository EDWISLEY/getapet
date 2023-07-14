const jwt = require('jsonwebtoken')

const createUserToken = async(user, req, res) =>{

//create a token
    const token = jwt.sign({

        name: user.name,
        email: user.email,
        id: user._id

    }, "nossosecret")
    
//return token
    res.status(200).json({
        message: "Você está autenticado",
        token: token,
        userId: user._id,
    })

}

module.exports = createUserToken