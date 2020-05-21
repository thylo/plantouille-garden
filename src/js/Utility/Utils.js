//Set the first letter of a sring in upper case
export function capitalize(s) {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

//return a list of object based on a list of property values
export const getElementList = (pool, element, prop) => {
    if (typeof element === "object") {
        return element.map(e => findObject(pool, prop, e));
    } else {
        console.log("Utils > getElement ERROR: 'element': ", element, "is not of type 'object'");
        return [];
    }
};



//get an object from an object list
export const findObject = (pool, prop, search) => {
    if (typeof prop === "string") {
        return pool.find(plante => plante[prop] === search);
    } else {
        console.log("Utils > findObject ERROR: 'prop': ", prop, "is not of type 'string'");
        return [];
    }
};

//convert object array to simple array of value based on property
export const arrObj2prop = (arr, prop) => {
    if (typeof prop === "string") {
        let newArr = [];
        arr.forEach(el => {
            newArr.push(el[prop])
        });
        return newArr;
    } else {
        console.log("Utils > arrObject2prop ERROR: 'prop': ", prop, "is not of type 'string'");
        return [];
    }
};

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
export const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}
