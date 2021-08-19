const pool = require('../database/mysql.cnx')
let sql = {
  checkFavMovies: async (movieName, email) => {

    let conn;
    try {
      let comprobarDatoExistente =
        "SELECT count(*) as contador FROM `favmovies` WHERE `idmovie`= ? and `emailuser`= ?";
      conn = await pool.getConnection();
      result = await conn.query(comprobarDatoExistente, [movieName, email]);
    } catch (err) {
      result = err;
    } finally {
      if (conn) conn.end();
    }
    return result;

  },
  addFavMovie: async (movieName, email) => {
     
            let conn;
            try {
              conn = await pool.getConnection();
              let sql_query = "INSERT INTO favmovies value (?,?)";
              result= await conn.query(sql_query, [movieName, email]);
            } catch (err) {
              result = err;
            } finally {
              if (conn) conn.end();
            }
            return result;
     
  },

  allFavMovies: async (email) => {
    let conn;
    let result;
    try {
      conn = await pool.getConnection();
      let sql_query = " SELECT idmovie FROM favmovies  WHERE emailuser  = ? "; ///
      result = await conn.query(sql_query, email);
    } catch (err) {
        err;
    } finally {
      if (conn) conn.end();
    }
    return result;
  },
  allFavMoviesApi: async (email) => {
    let conn;
    let result;
    try {
      conn = await pool.getConnection();
      let sql_query = "  SELECT * FROM favmovies WHERE idmovie LIKE '%tt%' and `emailuser` = ? "; ///
      result = await conn.query(sql_query, email);
    } catch (err) {
        err;
    } finally {
      if (conn) conn.end();
    }
    return result;
  },
  checkLocalFavMovies: async (email ) => {
    let conn;
    let result;
    try {
      conn = await pool.getConnection();
      let sql_query = " SELECT * FROM favmovies WHERE idmovie NOT LIKE '%tt%' and `emailuser` = ? "; ///
      result = await conn.query(sql_query,email );
    } catch (err) {
        err;
    } finally {
      if (conn) conn.end();
    }
    return result;
  },
  delFavMovies: async (idMovie,email) => {
    let conn;
    let result;
    try {
      conn = await pool.getConnection();
      let sql_query = " DELETE FROM `favmovies` WHERE idmovie = ? and `emailuser` = ?"; ///
      result = await conn.query(sql_query, [idMovie,email]);
    } catch (err) {
        err;
    } finally {
      if (conn) conn.end();
    }
    return result;
  },
};

module.exports = sql;
