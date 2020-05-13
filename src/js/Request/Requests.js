import axios from 'axios';
require('dotenv').config();

//axios async requests handler 
export function fetchData (path, action){
    axios(process.env.BASE_URL + path)
        .then(res => action(res.data))
        .catch(err => console.log(err))
};

//axios async post handler 
export function postData (path, data){
    axios.post(process.env.BASE_URL + path, {data})
        .then(res => console.log(data, " has been added to " + path, res))
        .catch(err => console.log(err));
    
}

//axios async delete handler 
export function deleteData (path, el){
    axios.delete(process.env.BASE_URL + path + "/" + el.id)
        .then(res => console.log(el.name + " has been deleted", res));
};
