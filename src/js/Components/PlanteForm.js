import React from "react";
import {useForm} from "react-hook-form";

/**
 * This component allows the admin to perform several actions on plants as create or modify them
 * @param plantes
 * @param onSubmit
 * @returns {*}
 * @constructor
 */
const PlanteForm = ({plantes, onSubmit}) => {
    const {register, handleSubmit} = useForm();
    
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Nom</label>
            <input ref={register} name="name" type="text" placeholder="tomate"/>

            <label>Pros</label>
            <select ref={register} name="pros" multiple>
                {plantes.map(plante => {
                    return (
                        <option key={plante.id} value={plante.name}>
                            {plante.name}
                        </option>
                    );
                })}
            </select>

            <label>Cons</label>
            <select ref={register} name="cons" multiple>
                {plantes.map(plante => {
                    return (
                        <option key={plante.id} value={plante.name}>
                            {plante.name}
                        </option>
                    );
                })}
            </select>

            <button>Confirmer</button>
        </form>
    );
};

export default PlanteForm;