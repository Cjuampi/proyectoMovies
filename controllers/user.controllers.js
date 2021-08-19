const logica = require("../utils/logica");
const pelis = require("../utils/pelis");
const Movies = require("../models/schemas")
const sql = require("../models/sql");
const apiKey = process.env.APIKEY;
const scraping = require ("../utils/opinions")

const user = {
  getDashboard: (req, res) => {
    res.status(200).render("dashboard");
  },
  getMovies: async (req, res) => {
    let tituloDePelicula = req.params.title;
    let data = await pelis.getMovie(
      `http://www.omdbapi.com/?t=${tituloDePelicula}&apikey=${apiKey}`
    );
    res.status(200).render("film", data);
  },
  postSearch: async (req, res) => {
    let movie = req.body.peliculaBuscar;
    let arrayVacio = [];

    let result = await Movies.findOne({ Title: movie }).exec();

    if (result == null) {
      let data = await pelis.getMovie(
        `http://www.omdbapi.com/?s=${movie}&apikey=${apiKey}`
      );

      for (let index = 0; index < data.Search.length; index++) {
        let idDePelis = data.Search[index].imdbID;
        let data2 = await pelis.getMovie(
          `http://www.omdbapi.com/?i=${idDePelis}&apikey=${apiKey}`
        );
        let array = await arrayVacio.push(data2);
      }

      res.status(200).render("search", { arrayVacio });
    } else {
      let objetoDePrueba = {
        Title: result.Title,
        Year: result.Year,
        Director: result.Director,
        Genre: result.Genre,
        Runtime: result.Runtime,
        Poster: result.Poster,
        Actors: result.Actors,
        Language: result.Language,
        imdbRating: result.imdbRating,
        imdbID: result.IdMovie,
      };

      arrayVacio.push(objetoDePrueba);

      res.status(200).render("search", { arrayVacio });
    }
  },
  getSearch: (req, res) => {
    res.status(200).render("search");
  },
  getSearchTitle: async (req, res) => {
    let filmTitle = req.params.title;

    let result = await Movies.findOne({ Title: filmTitle }).exec();   
    if (result === null) {
      let cleanTitle = await filmTitle
        .normalize("NFD")
        .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2")
        .normalize();
      let data = await pelis.getMovie(
        `http://www.omdbapi.com/?t=${cleanTitle}&apikey=${apiKey}`
      );
      let peliculaname = data.imdbID;
      let data2 = await pelis.getMovie(
        `http://www.omdbapi.com/?i=${peliculaname}&apikey=${apiKey}`
      );
      let data4 = await scraping.scrap(data2.Title)
      let opiniones = data4.arrayVacio  
      res.status(200).render("searchAllDetails", {data2,opiniones});
    } else {
      let data2 = {
        Title: result.Title,
        Year: result.Year,
        Director: result.Director,
        Genre: result.Genre,
        Runtime: result.Runtime,
        Poster: result.Poster,
        Actors: result.Actors,
        Language: result.Language,
        imdbRating: result.imdbRating,
        imdbID: result.IdMovie,
      };

      let data4 = await scraping.scrap(data2.Title)
      let opiniones = data4.arrayVacio 
      res.status(200).render("searchAllDetails", {data2,opiniones});
    }
  },
  getFavUserMovies: async (req, res) => {
    let arrayVacio = [];
    let email = req.user;

    try {
      let data = await sql.allFavMoviesApi(email);

      for (let index = 0; index < data.length; index++) {
      

        let idfilms = data[index].idmovie;

        let data2 = await pelis.getMovie(
          `http://www.omdbapi.com/?i=${idfilms}&apikey=${apiKey}`
        );
        await arrayVacio.push(data2);
      }

      let data2 = await sql.checkLocalFavMovies(email);

      for (let index = 0; index < data2.length; index++) {
        let idLocalMovie = data2[index].idmovie;

        let result = await Movies.find({ IdMovie: idLocalMovie }).exec();

        for (let index = 0; index < result.length; index++) {
          let result2 = result[index];

          let resultado2 = {
            Title: result2.Title,
            Year: result2.Year,
            Director: result2.Director,
            Genre: result2.Genre,
            Runtime: result2.Runtime,
            Poster: result2.Poster,
            Actors: result2.Actors,
            Language: result2.Language,
            imdbRating: result2.imdbRating,
            imdbID: result2.IdMovie,
          };

          arrayVacio.push(resultado2);
        }
      }
    } catch (error) {
      console.log("Recibo", error);
    }

    res.status(200).render("favMovies", { arrayVacio });
  },
  deleteFavMovies: async (req, res) =>{
    let idMovie =  req.params.idMovie
    let email = req.user;
    let data = await sql.delFavMovies(idMovie,email)
    res.status(200).render("message", {
      type: "Info: ",
      message: `Borrado con éxito`,
      link: `/favMovies/`,
      flag: true,
    });
  },

  addFavUserMovies: async (req, res) => {
    try {
      let { movieId, Title } = req.params;
      let email = req.user;
      let data = await sql.checkFavMovies(movieId, email);
      if (data[0].contador > 0) {
        res.status(200).render("message", {
          type: "Error: ",
          message: `Esta pelicula ya está en mis películas`,
          link: `/search`,
          flag: true,
        });
      } else {
        let data2 = await sql.addFavMovie(movieId, email);
        res.status(200).render("message", {
          type: "Info: ",
          message: `Se agregó a mis películas`,
          link: `/search`,
          flag: true,
        });
      }
    } catch (error) {
      console.log("Recibo", error);
    }
  },
};

module.exports = user;
