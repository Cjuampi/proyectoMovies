function remove(title) {
  let deleteMethod = async (title) => {
    let response = await fetch(`https://app-movie-nhj.herokuapp.com/deleteFilm/${title}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response;
  };

  deleteMethod(title)
    /*     .then( resp => resp.json()) */
    .then((resp) => {
      window.location = resp.url;
    })
    .catch((error) => console.log(error));
}
