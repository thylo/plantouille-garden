const axios = require('axios').default;
const BASE = "http://localhost:1337";

const getAllPlantes = () => {
    axios.get(BASE+"/vegetables").then(response => {return response}).catch(error => console.log(error))
};

export default getAllPlantes;