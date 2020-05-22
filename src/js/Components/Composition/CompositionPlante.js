import {arrObj2prop, capitalize, findObject, arrayMult, arrayDivide} from "../../Utility/Utils";
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
    
    const tourConcat = tour => {
        let result = "";
        for(let i = 0; i < tour; i++){
            result += ".";
        }
        
        return result;
    }

    const selectOptions = plantes.map(plante => {
        return {label: capitalize(plante.name), value: plante.name}
    });

    const treeCreator = (branchPossibilities, prevJunction, branch, remainingTreeComponents) => {
        let tour = 0;
        branchPossibilities.total.forEach(activePossibility => {
            tour ++;
            console.log(tourConcat(tour) + tour + " "+ activePossibility.name);
            //we don't want to modify the pre-existant data that could broke further loops so we copy it in a new one
            let remainingTreeComponentsTmp = [...remainingTreeComponents];
            //reduce the remaining tree components deeper we go
            remainingTreeComponentsTmp.splice(arrObj2prop(remainingTreeComponents, "name").indexOf(activePossibility.name), 1);
            //We need to copy that to to avoid duplicated element in a same branch
            //TODO: savoir pourquoi est-ce que branch et subBranch sont différent ici
            let subBranch = [...branch];
            console.log(tourConcat(tour) + "branch",branch);
            console.log(tourConcat(tour) + "subBranch",subBranch);
            //we determine the next possibilities for branching on this junction
            let nextBranchPossibilities = arrayDivide(remainingTreeComponentsTmp, activePossibility.cons, "name");

            //------------------------------------------------------------------------------------------------------
            
            //BUT we need to be super sure that no element in this list has the active possibility in its cons
            let exclude = [];
            nextBranchPossibilities.forEach(nextPossibility =>{
                if(findObject(nextPossibility.cons, "name", activePossibility.name) != null){
                    exclude.push(nextPossibility);
                }
            });
            
            //exclude the elements that have active element in their cons
            nextBranchPossibilities = arrayDivide(exclude, nextBranchPossibilities, "name");

            //------------------------------------------------------------------------------------------------------
            
            //get pros and neutral from active possibility
            let nextBranchPossibilitiesPros = arrayMult(nextBranchPossibilities, activePossibility.pros, "name");
            let nextBranchPossibilitiesNeutral = arrayDivide(nextBranchPossibilities, nextBranchPossibilitiesPros, "name");

            //------------------------------------------------------------------------------------------------------
            
            // Check the affinity of the activePossibility with the previous one in the branchHierarchy
            let prevplantInBranch = subBranch[subBranch.length-1];
            //store the affinity on this level to avoid multiple incrementation
            let storeLevel = prevplantInBranch.level;
            console.log(tourConcat(tour) + "prevplantInBranch",prevplantInBranch);
            //the active possibility is in pros from prev in hierarchy => increment level of prev
            if(findObject(branchPossibilities.pros, "name", activePossibility.name) != null){
                console.log("prevInBranch level : ", prevplantInBranch.level);
                console.log("+1");
                prevplantInBranch.level ++;
                console.log(tourConcat(tour) + "subBranch",subBranch);
                console.log("prevInBranch level now : ", prevplantInBranch.level);
            }

            //------------------------------------------------------------------------------------------------------

            // Adding the active possibility to the subBranch
            //the prev in hierarchy is in pros from active possibility => increment level of active
            if(findObject(activePossibility.pros, "name", prevplantInBranch.name) != null) {
                subBranch.push({plant: activePossibility, level: 2});
            } 
            
            //normal level
            else {
                subBranch.push({plant: activePossibility, level: 1});
            }
            
            console.log(tourConcat(tour) + "subBranch",subBranch);

            //------------------------------------------------------------------------------------------------------

            //Test if the branch goes further
            //End branch
            if (nextBranchPossibilities.length === 0) {
                setComposition(composition.push(subBranch));
                console.log(tourConcat(tour) + "end branch");
            }

            //Continue branch
            else {
                treeCreator({
                    pros: nextBranchPossibilitiesPros,
                    neutral: nextBranchPossibilitiesNeutral,
                    total: nextBranchPossibilities
                }, activePossibility, subBranch, remainingTreeComponentsTmp);
            }

            //------------------------------------------------------------------------------------------------------
            
            //reset the level of prev for the next loop
            prevplantInBranch.level = storeLevel;
            console.log(tourConcat(tour) + "reset level of " + prevplantInBranch.name);
        })
    };

    //------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------

    //Launch 
    const generateComp = e => {
        //------------------------------------------------------------------------------------------------------
        e.preventDefault();
        //create an array with the plants object selected by the user
        let arr_obj_plantes = [];
        selectedPlantes.forEach(plante => {
            arr_obj_plantes.push(findObject(plantes, "name", plante.value));
        });

        //------------------------------------------------------------------------------------------------------

        let tour  = 0;
        //generate composition
        //for each selected plant
        arr_obj_plantes.forEach(selectedPlante => {
            tour ++;
            console.log(tour + " "+ selectedPlante.name);
            //editable arr_obj_plante on each new branch root, the plante tmp is regenerated
            //we don't want to modify pre-existant data that could broke further loops
            let arr_obj_planteTmp = [...arr_obj_plantes];
            arr_obj_planteTmp.splice(arrObj2prop(arr_obj_planteTmp, "name").indexOf(selectedPlante.name), 1);
            
            //create the effective plants array (no cons allowed)
            let effectiveplants = arrayDivide(arr_obj_planteTmp, selectedPlante.cons, "name");

            //------------------------------------------------------------------------------------------------------

            //BUT we need to be super sure that no element in this list has the active possibility in its cons
            let exclude = [];
            effectiveplants.forEach(effectivePlant =>{
                if(findObject(effectivePlant.cons, "name", selectedPlante.name)){
                    exclude.push(effectivePlant);
                }
            });

            effectiveplants = arrayDivide(effectiveplants, exclude, "name");

            //------------------------------------------------------------------------------------------------------
            
            //get effective pros 
            let effectivePros = arrayMult(effectiveplants, selectedPlante.pros, "name");
            //get effective neutral via effective pros
            let effectiveNeutral = arrayDivide(arr_obj_planteTmp, effectivePros, "name");

            //------------------------------------------------------------------------------------------------------

            //rooting recursivity preparing the level of afinity
            let branch = [{plant: selectedPlante, level: 1}];
            //end of the branch
            if (effectivePros.length === 0) {
                setComposition(composition.push(branch));
            }

            //continue recursively
            else {
                console.log("branch", branch);
                treeCreator({
                    pros: effectivePros,
                    neutral: effectiveNeutral,
                    total: effectiveplants
                }, selectedPlante, branch, arr_obj_planteTmp);
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
Pour toutes les plantes de la sélection{
    je prends la plante i
    je constitue sa liste effective de pros
    je crée un nouveau tableau dans lequel je push ma plante i
    si la liste == 0{
        on arrête la branche
    }
    
    si la liste > 0{
        pour toutes ces pros{
            je prend la plante j
            je constitue la liste de pros effective - les plantes précédentes (i)
            je push la plante j au tableau de branche
            si la liste == 0{
                on arrête la branche
                on ajoute la branche à l'arbre
            }
            
            si la liste de pros > 0{
                pour toutes ces pros{
                    je prend la plante k
                    je constitue la liste de pros effective - les plantes précédentes (i, j)
                    je push la plante k au tableau de branche
                    si la liste de pros == 0{
                        on arrête la branche
                        on ajoute la branche à l'arbre
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



