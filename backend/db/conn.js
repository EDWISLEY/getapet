const mongoose = require('mongoose')

async function main(){
   await mongoose.connect('mongodb://localhost:27017/getpet')
   //await mongoose.connect('mongodb://127.0.0.1:27017/getpet')
    console.log('Conectou ao Mongoose!!')
}

main().catch((err) => console.log(err))

module.exports = mongoose
