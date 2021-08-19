const pool = require('../database/mysql.cnx')
const muserGoogle = {
    searchOneUser: async (user) => {
        let conn;
        let result;
        try {
          conn = await pool.getConnection();
          let sql_query = "select count(*) as num from users where email = ?"
          result = await conn.query(sql_query,user);
        } catch (err) {
          throw err;
        } finally {
          if (conn) conn.end();
        }
        return result
    },
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
    insertNewToken: async(email,token)=>{
        let conn;
        let result;
        try {
            conn = await pool.getConnection();
            let sqlQuery = ("update users set token=? where email=?")
            result = await conn.query(sqlQuery,[token,email]);
        } catch (err) {
            result = {codeError: err.code, numError: err.errno}
        } finally {
            if (conn) conn.end();
        }
        return result  
    }
}
module.exports = muserGoogle;