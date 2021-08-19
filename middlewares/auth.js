const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
let middlewares = {
    isAuth: (req,res,next)=>{
        if(!req.headers.cookie){
            return res.status(403).render('message',{type:'Error:', message:'No tienes autorización',link:'/',flag: true})
        }
        const reqToken = cookieParser.JSONCookies(req.headers.cookie)
        const token = reqToken.split('=')[1]
        const payload = jwt.decode(token, process.env.SECRET)
        let timeStamp = Date.now().toString().substr(0,10)
        if(payload.exp < timeStamp){
            return res.status(403).render('message',{type:'Error:', message:'Token expirado',link:'/',flag: true})
        }
        req.user = payload.email
        req.admin = payload.admin 
        next()
    },
    isUser : (req,res,next)=>{
        if(req.admin==1){
            res.status(403).render('message',{type:'Error:', message:'No tienes permiso para esta sección',link: '/admin' ,flag: true})
        }
        next()
    },
    isAdmin : (req, res,next)=>{
        if(req.admin==0){
            res.status(403).render('message',{type:'Error:', message:'No tienes permiso para esta sección',link:'/dashboard' ,flag: true})
        }
        next()
    }

}
module.exports = middlewares