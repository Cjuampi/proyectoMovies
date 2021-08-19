const router = require("express").Router();
const pages = require("../controllers/pages.controllers")
const user = require("../controllers/user.controllers")
const admin = require('../controllers/admin.controllers')
const midW = require('../middlewares/auth')
const passport = require("../middlewares/passport");


//Rutas de inicio
router.get("/",pages.home);
router.post("/",pages.postLogin)
router.post("/login",pages.postLogin)
router.post("/singUp", pages.postSingUp)
router.get('/auth/google',passport.authenticate('google', { 
    scope: ['https://www.googleapis.com/auth/plus.login',
          'https://www.googleapis.com/auth/userinfo.profile', 
          'https://www.googleapis.com/auth/userinfo.email'] 
  }),(req,res) =>{ res.redirect('/dashboard')});
router.get('/auth/google/callback',passport.authenticate('google', { failureRedirect: '/login' }), pages.googleAuth);

//Rutas user 
router.get("/dashboard",midW.isAuth,midW.isUser,user.getDashboard)
router.get("/movies",midW.isAuth,midW.isUser,user.getMovies)
router.post("/search",midW.isAuth,midW.isUser,user.postSearch)
router.get("/search", midW.isAuth,midW.isUser,user.getSearch)
router.get("/search/:title",midW.isAuth,midW.isUser,user.getSearchTitle)
router.get("/favMovies",midW.isAuth,midW.isUser,user.getFavUserMovies)
router.get("/favMovies/:movieId/:Title",midW.isAuth,midW.isUser,user.addFavUserMovies)
router.get("/deleteFilm/:idMovie",midW.isAuth,midW.isUser,user.deleteFavMovies)
 
//Rutas admin
router.get("/admin",midW.isAuth,midW.isAdmin, admin.getLocalMovies)
router.get("/createMovie",midW.isAuth,midW.isAdmin,admin.getCreateMovie)
router.post("/createMovie",midW.isAuth,midW.isAdmin,admin.postCreateMovie)
router.get("/editMovie",midW.isAuth,midW.isAdmin,admin.getEditMovie)
router.put("/editMovie/:id",midW.isAuth,midW.isAdmin,admin.putMovie)
router.delete("/deleteFilm/:Title",midW.isAuth,midW.isAdmin, admin.deleteMovie)

//Rutas logout
router.get("/logout",pages.getLogout)

//Rutas no existentes
router.all("*",midW.isAuth,pages.allRouters)

module.exports = router;