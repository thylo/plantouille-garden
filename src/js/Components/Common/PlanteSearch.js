﻿import React from "react";
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
        setPlanteSearch({name: research.name.toLowerCase(), plantCategory: research.plantCategory});
    };

    return (
        <form onChange={handleSubmit(onChanging)}>
            <div className="formModule">
                <label>name</label>
                <input type="text" ref={register} name="name" placeholder="tomate"/>
            </div>
            
            <div className="formModule">
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
            </div>
        </form>
    );
};

export default PlanteSearch;
