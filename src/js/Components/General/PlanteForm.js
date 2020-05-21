import {capitalize} from "../../Utility/Utils";
﻿import React from "react";
import {useForm} from "react-hook-form";

/**
 * This component allows the admin to perform several actions on plants as create or modify them
 * @param plantes
 * @param onSubmit
 * @returns {*}
 * @constructor
 */
const PlanteForm = ({plantes, onSubmit, formPlante}) => {
    const {register, handleSubmit} = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Nom</label>
                <input required ref={register} name="name" type="text" placeholder="tomate" defaultValue={formPlante != null ? formPlante.name : ""}/>
            </div>

            <div>
                <label>Catégorie</label>
                <select required ref={register} defaultValue={formPlante != null ? formPlante.plantCategory : ""} name="plantCategory">
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
                <select required ref={register} name="pros" multiple>
                    {
                        plantes.map(plante => {
                            return (
                                <option key={plante.id} selected={formPlante != null ? true : false} value={plante.name}>
                                    {capitalize(plante.name)}
                                </option>
                            )
                        })
                    }
                </select>
            </div>

            <div>
                <label>Associations défavorables</label>
                <select required ref={register} defaultValue={formPlante != null ? formPlante.cons : []} name="cons" multiple>
                    {
                        plantes.map(plante => {
                            return (
                                <option key={plante.id} value={plante.name}>
                                    {capitalize(plante.name)}
                                </option>
                            )
                        })
                    }
                </select>
            </div>

            <div>
                <label>Date d'ensemencement</label>
                <input required ref={register} defaultValue={formPlante != null ? formPlante.seeding : ""} name="seeding" type="date"/>
            </div>

            <div>
                <label>Date de plantation</label>
                <input required ref={register} defaultValue={formPlante != null ? formPlante.planting : ""} name="planting" type="date"/>
            </div>

            <div>
                <label>Date de récolte</label>
                <input required ref={register} defaultValue={formPlante != null ? formPlante.harvest : ""} name="harvest" type="date"/>
            </div>

            <div>
                <label>Date de récolte des graines</label>
                <input required ref={register} defaultValue={formPlante != null ? formPlante.seedHarvest : ""} name="seedHarvest" type="date"/>
            </div>

            <div>
                <label>Rusticité</label>
                <input required ref={register} defaultValue={formPlante != null ? formPlante.hardiness : ""} name="hardiness" type="number"/> <label>°C</label>
            </div>

            <div>
                <label>Pouvoir germinatif</label>
                <input required ref={register} defaultValue={formPlante != null ? formPlante.germPower : ""} name="germPower" type="number" min="0"/> <label>ans</label>
            </div>

            <button>Confirmer</button>
        </form>
    );
};

export default PlanteForm;