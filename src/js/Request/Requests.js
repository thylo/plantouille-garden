import axios from 'axios';
const BASE_URL = "http://localhost:1337";

//axios async requests handler 
const fetchData = async (path, action) => {
    const res = await axios(BASE_URL + path);
    action(res.data);
};

export default {fetchData};