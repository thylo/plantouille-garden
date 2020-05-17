import React from "react";
import {useForm} from "react-hook-form";

/**
 * This component is a search bar for the plant list
 * @param setPlanteSearch
 * @returns {*}
 * @constructor
 */
const PlanteSearch = ({setPlanteSearch}) => {
    const {register, handleSubmit} = useForm();
    const plantCategories = ["tous", "arbre", "aromatique", "buisson", "fleur", "fruit", "legume", "racine"];
    
    const onChanging = research => {
        console.log(research);
        setPlanteSearch({name: research.name, plantCategory: research.plantCategory});
    };

    return (
        <form onChange={handleSubmit(onChanging)}>
            <label>name</label>
            <input type="text" ref={register} name="name"/>
            <label>Category</label>
            <select ref={register} name="plantCategory" multiple>
                {plantCategories.map(plantCategory => {
                    return (
                        <option key={plantCategory} value={plantCategory} selected={plantCategory === "tous"}>
                            {plantCategory}
                        </option>
                    );
                })}
            </select>
        </form>
    );
};

export default PlanteSearch;
