const bcrypt = require('bcrypt')
const crypto = require('crypto')
const User = require('../models/User')

const mailer = require('../mailer/mailer')

module.exports = class UserResetPassController {

    static async forgotPass(req, res){
        const { email } = req.body

         // Valida se o email e preenchido
        if(!email){
            res.status(422).json({message: 'O E-mail é obrigatório'})
            return
        }

        //check if user exists
        const user = await User.findOne({email: email})

        if (user){

            const token = crypto.randomBytes(20).toString('hex')

            const dateNow = new Date()
            
            //dateNow.setHours(dateNow.getHours() + 1 )

            try {
                await User.findByIdAndUpdate(user.id, {
                    '$set': {
                        userResetPassToken: token,
                        userResetPassExpires: dateNow,
                    }
                })
                mailer.sendMail({
                    to: email,
                    from: 'joeltonportopl15@gmail.com',
                    subject: 'Resete de Senha', 
                    template: 'template',
                    context: {token}
                })
                res.status(200).json({message: 'Link enviado para o E-mail '+ email})
                return
            }
            catch (err) {
                res.status(422).json({
                    message: err.message
                })
                return
            }
        }
        else{
            res.status(422).json({message: 'Não há usuário cadastrado com este E-mail!'})
            return
        }
    }

    // reset senha 
    static async resetPass(req, res){

        const {usertoken, password, confirmpassword} = req.body

        //check if user exists
        const tokenUserVerification = await User.findOne({userResetPassToken: usertoken})

        try {
            //Validações de campos
            if(typeof(usertoken) == 'undefined' || usertoken == ''){
                
                throw {
                    'name': 'err', 
                    'message': 'O Token é Obrigatório'
                }
            } 
            else if(typeof(password) == 'undefined' || typeof(confirmpassword) == 'undefined' || password == '' || confirmpassword == '') {
                throw {
                    'name': 'err', 
                    'message': 'A Senha é Obrigatória'
                }
            }
    
            if(password !== confirmpassword) {
                throw {
                    'name': 'err', 
                    'message': 'As Senhas não Conferem'
                }
            }

            if(tokenUserVerification == null) {
                
                throw {
                    'name': 'err', 
                    'message': 'Token Invalido'
                }
                
            }
            else {

                const tsStart = tokenUserVerification.userResetPassExpires.getTime()
                const tsMinutes = tsStart + 900000 // 900000, equivale a 15 minutos
                const momentNow = new Date()

                if( momentNow.getTime() > tsMinutes ) {
                    throw {
                        'name': 'err', 
                        'message': 'Token Expirado'
                    }
                }
                
                // Verificação ser o token que está armazenado no banco e igual ao enviado pelo o usuário
                // para alterar a senha
                if(tokenUserVerification.userResetPassToken == usertoken) {
                    
                    const salt = await bcrypt.genSalt(12)
                    const passwordHash = await bcrypt.hash(password, salt)
                    await User.findByIdAndUpdate(tokenUserVerification.id, {
                        '$set': {
                            password: passwordHash,
                            //userResetPassExpires: tokenUserVerification.userResetPassExpires.setMinutes(tokenUserVerification.userResetPassExpires.getMinutes() + 15),
                        }
                    })

                    res.status(200).json({message: 'Senha alterada com sucesso'})
                    return
                }
            }  
        }catch (e){
            res.status(422).json({
                message: e.message
            })
            return
        }
    }
}