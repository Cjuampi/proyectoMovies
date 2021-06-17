require('dotenv').config()
const jwt = require('jsonwebtoken');
const Movies = require('../models/schemas')
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);


const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost', 
    user:'root',
    database: 'movieproject', 
    connectionLimit: 5});

const usurioDB = {
    name: "Luis",
    password: "1234",
    rol: "admin"
} 

const logica = {
    cryptoW : (word)=>{
      return bcrypt.hashSync(word, salt)
    },
    validateUser : (data) => {
        return data.user==usurioDB.name && data.password==usurioDB.password ;
    },  
    getRolUser : (data) =>{
        return usurioDB.rol;
    },
    generateToken : (data)=>{
        let tkn = jwt.sign({user: data.user}, process.env.SECRET, { expiresIn: '10h' });
        return tkn;
    },
    getUser : (data) =>{
/*         let conn
        try {
            conn = await pool.getConnection();
            const res = await conn.query("INSERT INTO bbdd.mensajes value (?, ?)",[6,message]);
            console.log(res); 
          } catch (err) {
            throw err;
          } finally {
            if (conn) return conn.end();
          } */
        return false
    },
    createUser : async (data) =>{
        let conn; 
        try {
            conn = await pool.getConnection();
            const res = await conn.query("INSERT INTO movieproject.users ('name',email,password) value (?,?,?)",[data.name,data.email,data.password]);
            console.log('res',res);
            return res
          } catch (err) {
            console.log(err)
            return err;
          } finally {
            if (conn) return conn.end();
          }
        /* return true  */
    },
    loadlLocalMovies:async () =>{
        let resultM = await  Movies.find()
        return resultM 
    },
    findOneLocalMovies: async (id) =>{
        let resultOne = await  Movies.find({IdMovie: `${id}`})
        return resultOne
    }
}

module.exports = logica