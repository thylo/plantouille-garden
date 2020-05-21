import axios from 'axios';

//axios async requests handler 
export const fetchData = (path, action) => {
    axios(process.env.﻿REACT_APP_BASE_URL + path)
        .then(res => action(res.data))
        .catch(err => console.log(err))
};

//axios async post handler 
export const postData = (path, data, action) => {
    axios({
        method: 'post',
        url: process.env.﻿REACT_APP_BASE_URL + path,
        data
    })
        .then(res => {
            action();
            console.log(data, " has been added to " + "'" + path + "'", res);
        })
        .catch(err => console.log(err));
};

//axios async update handler 
export const updateData = (path, id, data, action) => {
    axios({
        method: 'put',
        url: `${process.env.﻿REACT_APP_BASE_URL + path}/${id}`,
        data
    })
        .then(res => {
            action();
            console.log(data, " has been updated in " + "'" + path + "'", res);
        })
        .catch(err => console.log(err));
};

//axios async delete handler 
export const deleteData = (path, el, action) => {
    axios({
        method: "delete",
        url: `${process.env.﻿REACT_APP_BASE_URL + path}/${el.id}`,
    })
        .then(res => {
            action();
            console.log(el.name + " has been deleted", res);
        });
};
