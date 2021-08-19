const editForm= document.getElementById('formEditMovie')
editForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    title = document.getElementById('title').value;
    year = document.getElementById('year').value;
    director = document.getElementById('director').value;
    
    genre = document.getElementById('genre').value;
    runtime = document.getElementById('duration').value;
    poster = document.getElementById('poster').value;
    IdMovie = document.getElementById('IdMovie').value
    Language = document.getElementById('language').value
    imdbRating = document.getElementById('rating').value
    Actors = document.getElementById('actors').value

    let data = {
        Title: title,
        Year: parseInt(year),
        Director: director,
        Genre: genre,
        Runtime: runtime,
        Poster: poster,
        Language: Language,
        imdbRating: imdbRating,
        Actors: Actors   ,     
        registerDate: new Date(),
        IdMovie: parseInt(IdMovie)
    }

    let putMethod = async(url, data)=>{
        let response = await fetch(url,{
            method: 'PUT',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        return response
    }

    putMethod('/editMovie/:id', data)
        .then( resp => {
            window.location = resp.url
        })
})