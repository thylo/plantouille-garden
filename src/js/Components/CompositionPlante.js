import React, {useState} from "react";
import SearchPlante from "./SearchPlante";

/**
 * This component display the composition panel
 * @param plantes
 * @returns {*}
 * @constructor
 */
const CompositionPlante = ({plantes}) => {
    //DEV
    const [comps, setComps] = useState([
        {id: 0, nom: "maComp", plantes: [0, 1]},
        {id: 0, nom: "monAutreComp", plantes: [1, 0]}
    ]);


    return (
        <div>
            <h2>Créer composition</h2>
            <ul>
                {
                    comps.map(comp => {
                        return <li>{comp.name}</li>
                    })
                }
            </ul>
            <SearchPlante plantes={plantes}/>
        </div>
    );
};

export default CompositionPlante;