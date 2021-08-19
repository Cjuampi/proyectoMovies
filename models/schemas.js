const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AutoIncrement = require('mongoose-sequence')(mongoose);

const localMoviesSchemas = new Schema({
    Title:{
        type:String,
        required: true,
        unique: true
    },
    Year:{
        type: Number,
        required: true
    },
    Director:{
        type:String,
        require: true
    }, 
    Genre: {
        type:String,
        require: true
    },
    Runtime : {
        type:String,
        required: true
    },
    Poster : {
        type:String,
        required: true
    },
    IdMovie : { 
        type:Number
    },
    imdbRating : { 
        type:Number
    },
    Actors : { 
        type:String,
        required: true
    },
    Language : { 
        type:String,
        required: true
    },
    
    registerDate: {
        type: Date,
        required: true,
        default: new Date()
      }
});

localMoviesSchemas.plugin(AutoIncrement, {inc_field: 'IdMovie'});
const Movies = mongoose.model("localMovie",localMoviesSchemas);
module.exports = Movies