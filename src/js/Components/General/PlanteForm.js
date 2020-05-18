import {capitalize} from "../../Utility/Utils";

﻿import React from "react";
import {useForm} from "react-hook-form";
import Select from 'react-select';

/**
 * This component allows the admin to perform several actions on plants as create or modify them
 * @param plantes
 * @param onSubmit
 * @returns {*}
 * @constructor
 */
const PlanteForm = ({plantes, onSubmit}) => {
    const {register, handleSubmit} = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Nom</label>
                <input ref={register} name="name" type="text" placeholder="tomate"/>
            </div>

            <div>
                <label>Catégorie</label>
                <select ref={register} name="plantCategory">
                    <option value="arbre">Arbre</option>
                    <option value="aromatique">Aromatique</option>
                    <option value="buisson">Buisson</option>
                    <option value="fruit">Fruit</option>
                    <option value="fleur">Fleur</option>
                    <option value="legume">Légume</option>
                    <option value="racine">Racine</option>
                </select>
            </div>

            <div>
                <label>Associations favorables</label>
                <Select ref={register} name="pros" isMulti
                        options={
                            plantes.map(plante => {
                                return {
                                    value: plante.name,
                                    label: capitalize(plante.name)
                                }
                            })
                        }
                />
            </div>

            <div>
                <label>Associations défavorables</label>
                <Select ref={register} name="cons" isMulti
                        options={
                            plantes.map(plante => {
                                return {
                                    value: plante.name,
                                    label: capitalize(plante.name)
                                }
                            })
                        }
                />
            </div>

            <div>
                <label>Date d'ensemencement</label>
                <input ref={register} name="seeding" type="date"/>
            </div>

            <div>
                <label>Date de plantation</label>
                <input ref={register} name="planting" type="date"/>
            </div>

            <div>
                <label>Date de récolte</label>
                <input ref={register} name="harvest" type="date"/>
            </div>

            <div>
                <label>Date de récolte des graines</label>
                <input ref={register} name="seedHarvest" type="date"/>
            </div>

            <div>
                <label>Rusticité</label>
                <input ref={register} name="hardiness" type="number"/> <label>°C</label>
            </div>

            <div>
                <label>Pouvoir germinatif</label>
                <input ref={register} name="germPower" type="number" min="0"/> <label>ans</label>
            </div>

            <button>Confirmer</button>
        </form>
    );
};

export default PlanteForm;