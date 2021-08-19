const pool = require('../database/mysql.cnx')

const userMySQL = {
    createUser : async(data) =>{
        let conn;
        let result;
        try {
            conn = await pool.getConnection();
            let sqlQuery = ("INSERT INTO users value (?,?,?,?,?)")
            result = await conn.query(sqlQuery,data);
        } catch (err) {
            result = {codeError: err.code, numError: err.errno}
            console.log(err)
        } finally {
            if (conn) conn.end();
        }
        return result
    },
    existUser : async (email) =>{
        let conn;
        let result;
        try {
            conn = await pool.getConnection();
            let sqlQuery = ("select email from users where email=?")
            result = await conn.query(sqlQuery,email);
            result = result[0]
        } catch (err) {
            result = {codeError: err.code, numError: err.errno}
        } finally {
            if (conn) conn.end();
        }
        return result
    },
    getRowUser: async(email)=>{
        let conn;
        let result;
        try {
            conn = await pool.getConnection();
            let sqlQuery = ("select * from users where email=?")
            result = await conn.query(sqlQuery,email);
            result = result[0]
        } catch (err) {
            result = {codeError: err.code, numError: err.errno}
        } finally {
            if (conn) conn.end();
        }
        return result      
    },
    insertNewToken: async(email,token)=>{
        let conn;
        let result;
        try {
            conn = await pool.getConnection();
            let sqlQuery = ("update users set token=? where email=?")
            result = await conn.query(sqlQuery,[token,email]);
        } catch (err) {
            console.log(err)
            result = {codeError: err.code, numError: err.errno}
        } finally {
            if (conn) conn.end();
        }
        return result  
    }
}

module.exports = userMySQL