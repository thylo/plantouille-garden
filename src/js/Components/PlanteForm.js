import React from "react";
import {useForm} from "react-hook-form";

const PlanteForm = ({plantes, onSubmit}) => {
    const {register, handleSubmit} = useForm();
    
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Nom</label>
            <input ref={register} name="nom" type="text" placeholder="tomate"/>

            <label>Pros</label>
            <select ref={register} name="pros" multiple>
                {plantes.map(plante => {
                    return (
                        <option key={plante.id} value={plante.nom}>
                            {plante.nom}
                        </option>
                    );
                })}
            </select>

            <label>Cons</label>
            <select ref={register} name="cons" multiple>
                {plantes.map(plante => {
                    return (
                        <option key={plante.id} value={plante.nom}>
                            {plante.nom}
                        </option>
                    );
                })}
            </select>

            <button>Confirmer</button>
        </form>
    );
}

export default PlanteForm;