const fetch = require('node-fetch');

const pelis = {
    getMovie: async (url) => {
        let response = await fetch(url)
        let data = await response.json()
        return data
    }
}
module.exports=pelis;