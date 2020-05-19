import axios from 'axios';
//require('dotenv').config();

const BASE_URL = "http://localhost:1337";

//axios async requests handler 
export function fetchData(path, action) {
    axios(BASE_URL + path)
        .then(res => action(res.data))
        .catch(err => console.log(err))
};

//axios async post handler 
export function postData(path, data, action) {
    axios({
        method: 'post',
        url: BASE_URL + path,
        data
    })
        .then(res => {
            action();
            console.log(data, " has been added to " + "'" + path + "'", res);
        })
        .catch(err => console.log(err));
}

//axios async update handler 
export function updateData(path, data) {
    axios.put(BASE_URL + path, {data})
        .then(res => console.log(data, " has been added to " + "'" + path + "'", res))
        .catch(err => console.log(err));

}

//axios async delete handler 
export function deleteData(path, el, action) {
    axios({
        method: "delete",
        url: BASE_URL + path + "/" + el.id,
    })
        .then(res => {
            action();
            console.log(el.name + " has been deleted", res);
        });
};
