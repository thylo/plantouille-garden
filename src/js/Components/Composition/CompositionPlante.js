import {arrObj2prop, capitalize, findObject, arrayMult, arrayDivide, arraySubstract} from "../../Utility/Utils";
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
    const [compositions, setCompositions] = useState([]);
    const [compAreCreated, setCompAreCreated] = useState(false);
    const [generating, setGenerating] = useState(false);

    const selectOptions = plantes.map(plante => {
        return {label: capitalize(plante.name), value: plante.name}
    });
    
    const orderByLength = e => {
        setCompositions([...compositions.sort((a, b) => a.length > b.length ? -1 : a.length > b.length ? 1 : 0)]);
    };

    const orderByAffinity = e => {
        setCompositions([...compositions.sort((a, b) => {
            let testA = a.reduce((acc, curr) => acc + curr.level);
            let testB = b.reduce((acc, curr) => acc + curr.level);
            if(testA > testB){
                return -1
            }
            
            else if(testA < testB){
                return 1;
            }
            
            else{
                return 0;
            }
        })]);
    };

    //Prepare an excludelist of elements based
    const arrayExcluder = (objArr, objSearch, propTarget, propTest) => {
        let exclude = [];
        objArr.forEach(obj => {
            if (findObject(obj[propTarget], propTest, objSearch[propTest]) != null) {
                exclude.push(obj);
            }
        });

        return exclude;
    };

    const treeCreator = (branchPossibilities, branch, remainingJunctions, accumulator) => {
        let hasLevelUp = false;
        let prevInBranch;
        branchPossibilities.total.forEach(activePossibility => {

            /////////////////////
            // Initialise loop //
            /////////////////////

            //we don't want to modify the pre-existant data that could broke further loops so we copy it in a new one
            //can use a spread because we don't modify the value inside, we just splice the array
            let remainingTreeJunctionsTmp = [...remainingJunctions];
            //reduce the remaining tree components deeper we go
            remainingTreeJunctionsTmp.splice(arrObj2prop(remainingTreeJunctionsTmp, "name").indexOf(activePossibility.name), 1);
            //We need to copy the branch content to avoid modifying other branches content
            // we must deeply clone the array because we'll modify the values in it
            let subBranch = JSON.parse(JSON.stringify(branch));


            ///////////////////////
            // Get possibilities //
            ///////////////////////

            //we determine the next possibilities for branching on this junction
            let nextBranchPossibilities = arrayDivide(remainingTreeJunctionsTmp, activePossibility.cons, "name");

            //BUT we need to be sure that no element in this list has the active possibility in its cons
            let exclude = arrayExcluder(nextBranchPossibilities, activePossibility, "cons", "name");
            //exclude the elements that have active element in their cons
            nextBranchPossibilities = arraySubstract(nextBranchPossibilities, exclude, "name");

            //get pros and neutral from active possibility
            let nextBranchPossibilitiesPros = arrayMult(nextBranchPossibilities, activePossibility.pros, "name");
            let nextBranchPossibilitiesNeutral = arrayDivide(nextBranchPossibilities, nextBranchPossibilitiesPros, "name");


            //////////////////////
            // Check affinities //
            //////////////////////

            // Check the affinity of the activePossibility with the previous one in the branchHierarchy
            if (subBranch.length > 0) {
                prevInBranch = subBranch[subBranch.length - 1];

                //the active possibility is in pros from prevInBranch => increment level of prev
                if (findObject(prevInBranch.plant.pros, "name", activePossibility.name) != null) {
                    prevInBranch.level++;
                }

            }

            // Check reverse affinity and push it to subBranch            
            // The prev in hierarchy is in pros from active possibility => increment level of active
            if (subBranch.length > 0 && findObject(activePossibility.pros, "name", prevInBranch.plant.name) != null) {
                subBranch.push({plant: activePossibility, level: 2});
            }

            // No pros affinity with prev => Normal level
            else {
                subBranch.push({plant: activePossibility, level: 1});
            }


            /////////////////////////////////////
            // Test if the branch goes further //
            /////////////////////////////////////

            // End the branch and set back to the precedent junction loop
            if (nextBranchPossibilities.length === 0) {
                setCompositions(accumulator.push(subBranch));
            }

            // Continue branch further
            else {
                treeCreator({
                    pros: nextBranchPossibilitiesPros,
                    neutral: nextBranchPossibilitiesNeutral,
                    total: nextBranchPossibilities
                }, subBranch, remainingTreeJunctionsTmp, accumulator);
            }
        })
    };

    //Launch 
    const generateComp = async e => {
        e.preventDefault();

        //reset the state to prevent error
        setCompositions([]);
        setCompAreCreated(false);
        setGenerating(true);
        let accumulator = [];

        //create an array with the plants object selected by the user
        let arr_obj_plantes = [];
        selectedPlantes.forEach(plante => {
            arr_obj_plantes.push(findObject(plantes, "name", plante.value));
        });

        //rooting recursivity preparing the level of afinity
        let branch = [];

        if (arr_obj_plantes.length > 0) {
            await treeCreator({
                pros: [],
                neutral: [],
                total: arr_obj_plantes
            }, branch, arr_obj_plantes, accumulator);

            return accumulator;
        }
    };

    const launchComp = async (e) => {
        generateComp(e).then(res => {
            setCompositions([...res]);
            setCompAreCreated(true);
            setGenerating(false);
        })
    };

    return (
        <div>
            <h2>Créer composition</h2>
            <form onSubmit={launchComp}>
                <Select onChange={el => setSelectedPlantes(el)} options={selectOptions} isMulti/>
                <button>Générer</button>
            </form>
            
            <h3>Trier par</h3>
            <form>
                <label>Taille de composition</label>
                <input type="checkbox" onChange={orderByLength}/>
                
                <label>Affinité</label>
                <input type="checkbox" onChange={orderByAffinity}/>
            </form>
            <ul>
                {compAreCreated ?
                    <p>{compositions.length} {compositions.length > 1 ? "compositions générées" : "composition générée"} </p> : ""}
                {compAreCreated ?
                    compositions.map(comp => {
                        return (
                            <li>
                                <ul style={{
                                    display: 'flex',
                                    flexDirection: 'row'
                                }}>
                                    {comp.map(item => {
                                        return (
                                            <li style={{
                                                display: 'block',
                                                backgroundColor: `rgb(${150 / item.level}, ${255 / item.level}, ${150 / item.level})`,
                                                padding: '1.5rem'
                                            }}>
                                                {item.plant.name} {item.level}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </li>
                        )
                    }) : generating ? <p>Génération en cours...</p> : ""
                }
            </ul>
        </div>
    );
};

export default CompositionPlante;



