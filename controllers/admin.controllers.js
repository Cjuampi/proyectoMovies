const logica = require("../utils/logica");
const pelis = require("../utils/pelis");
const Movies = require("../models/schemas")
const apiKey = process.env.APIKEY;

const admin = {
    getLocalMovies: async (req, res) => {
        let resultM = await logica.loadlLocalMovies();
        res.status(200).render("admin", { resultM });
    },
    getCreateMovie: (req, res) => {
        res.status(200).render("createMovie");
    },
    postCreateMovie: async (req, res) => {
        try {
            const movie = new Movies({
                Title: req.body.title,
                Year: req.body.year,
                Director: req.body.director,
                Genre: req.body.gender,
                Runtime: req.body.duration,
                Poster: req.body.image,
                Actors: req.body.actors,
                Language: req.body.language,
                imdbRating: req.body.rating,

            })
            let result = await movie.save((err) => {
                if (err) {
                    let mError = err.message.split(':')[0]
                    res.status(400).render("message", { type: "Error: ", message: `${mError}`, link: req.url, flag: true })
                } else {
                    res.status(200).render("message", { type: "Info: ", message: `Información introducida correctamente`, link: req.url, flag: true })
                }

            })
        } catch (error) {
            res.status(500).render("message", { type: "Error: ", message: `${error.message}`, link: req.url, flag: true })
        }
    },
    getEditMovie: async (req, res) => {
        let id = parseInt(req.query.data)
        let data = await logica.findOneLocalMovies(id)
        res.status(200).render('editMovie', { data });
    },
    putMovie: async (req, res) => {
        try {
            let data = req.body
            let update = await Movies.findOneAndUpdate({ IdMovie: data.IdMovie }, data, (err, data) => {
                if (err) {
                    res.status(400).render("message", { type: "Error: ", message: `Error`, link: req.url, flag: true })
                } else {
                    res.redirect(303, '/admin')
                }

            })
        } catch (error) {
            res.status(500).render("message", { type: "Error: ", message: `${error.message}`, link: req.url, flag: true })
        }
    },
    deleteMovie: async (req, res) => {
        try {
           
            await Movies.findOneAndRemove({ Title: req.params.Title }, function (err) {
                if (err) {
                    res.status(400).render("message", { type: "Error: ", message: `Error`, link: req.url, flag: true })
                } else {
                    res.redirect(303, '/admin')
                }

            })
        } catch (error) {
            res.status(500).render("message", { type: "Error: ", message: `${error.message}`, link: req.url, flag: true })
        }
    },
    getLogout : async(req,res) =>{
        await res.clearCookie('token')
        res.redirect('/')
    }
}

module.exports = admin;