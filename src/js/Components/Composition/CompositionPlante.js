import {arrObj2prop, capitalize, findObject, getElementList, getRandomInt} from "../../Utility/Utils";
import React, {useState} from "react";
import Select from "react-select";

/**
 * This component display the composition panel
 * @param plantes
 * @returns {*}
 * @constructor
 */
const CompositionPlante = ({plantes}) => {
    const [selectedPlantes, setSelectedPlantes] = useState([]);
    const [composition, setComposition] = useState([]);
    
    const selectOptions = plantes.map(plante => {
        return {label: capitalize(plante.name), value: plante.name}
    });
    
    //multiply two object arrays based on a property
    const arrayMult = (arr1, arr2, prop) => {
        let multipliedArray = [];
        //convert selection array obj to name array
        const str_selected = arrObj2prop(arr2, prop);
        //generate the multiplied array
        arr1.forEach(p => {
                if (str_selected.indexOf(p[prop]) >= 0) {
                    multipliedArray.push(findObject(arr1, prop, p[prop]));
                }
            }
        );
        
        return multipliedArray;
    };
    
    const treeCreator = (subSelection, prevItem, branche, selection) => {
        //reduce the array of selected plant deeper we go 
        selection.splice(arrObj2prop(selection, "name").indexOf(prevItem.name), 1);
        subSelection.forEach(selectedItem => {
            //after reducing the array, we don't want to modify the pre-existant data that could broke further loops
            let selectionTmp = [...selection];
            //We need to copy that to to avoid duplicated element in a same branch
            let subBranche = [...branche];
            let underSelection = arrayMult(selectionTmp, selectedItem.pros, "name");
            subBranche.push(selectedItem)
            if (underSelection.length === 0){
                setComposition(composition.push(subBranche));
            }
            
            else {
                treeCreator(underSelection, selectedItem, subBranche, selectionTmp);
            }
        })
    };

    //Launch 
    const generateComp = e => {
        e.preventDefault();
        //create an array with the plants object selected by the user
        let arr_obj_plantes = [];
        selectedPlantes.forEach(plante => {
            arr_obj_plantes.push(findObject(plantes, "name", plante.value));
        });

        //generate composition
        //for each selected plant
        arr_obj_plantes.forEach(selectedPlante => {
            //editable arr_obj_plante on each new branch root, the plante tmp is regenerated
            //we don't want to modify pre-existant data that could broke further loops
            let arr_obj_planteTmp = [...arr_obj_plantes];
            //TODO: plutot faire l'inverse. conserver ce qui n'est pas en cons, puis distinguer les neutrals des pros
            //create the effective pros array
            let effectivePros = arrayMult(arr_obj_planteTmp, selectedPlante.pros, "name");
            //rooting recursivity
            let branche = [selectedPlante];
            //end of the branch
            if (effectivePros.length === 0){
                setComposition(composition.push(branche));
            }
            
            //continue recursively
            else{
                treeCreator(effectivePros, selectedPlante, branche, arr_obj_planteTmp);
            }
        });
        
        console.log("composition", composition);
        //reset the state to prevent error
        setComposition([]);
    };

    return (
        <div>
            <h2>Créer composition</h2>
            <form onSubmit={generateComp}>
                <Select onChange={el => setSelectedPlantes(el)} options={selectOptions} isMulti/>
                <button>Générer</button>
            </form>
        </div>
    );
};

export default CompositionPlante;


/*
ma composition est un tableau 
Pour toutes les plantes de la sélection (carrote, basilic, orange){
    je prends la plante carrote
    je constitue sa liste effective de pros (basilic, orange)
    je crée un nouveau tableau dans lequel je push ma plante carotte
    si la liste == 0{
        on arrête la branche
    }
    
    si la liste > 0{
        pour toutes ces pros{
            je prend la plante basilic
            je constitue la liste de pros effective - les plantes précédentes (orange)
            je push la plante basilic au tableau de branche
            si la liste == 0{
                on continue ?
            }
            
            si la liste > 0{
                pour toutes ces pros{
                    je prend la plante orange
                    je constitue la liste de pros effective - les plantes précédentes (...)
                    je push la plante orange au tableau de branche
                    si la liste == 0{
                        on arrête la branche
                    }
                    ...
                    ...
                }
            }
        }
    }
}
 */
/*
pros = object
effectivePros = string
 */



