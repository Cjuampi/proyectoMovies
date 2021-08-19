require("dotenv").config();
const mongoose = require("mongoose");
const password = process.env.mPassword;
const dblocalM = process.env.mdblocalM
const connectionS = `mongodb+srv://conxUser:${password}@clusterappmovies.ji0kj.mongodb.net/${dblocalM}?retryWrites=true&w=majority`
/* const connectionL = process.env.projectMoviesDB */
mongoose.connect(connectionS,{ 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex : true,
  useFindAndModify: false
})
  .then(()=>{
    console.log('Mongo DataBase connected')
  })
  .catch( err => { 
    console.error(err)
  })