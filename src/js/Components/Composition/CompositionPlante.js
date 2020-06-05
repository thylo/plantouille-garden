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
    const [bests, setBests] = useState([]);
    const [compAreCreated, setCompAreCreated] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [displayLimit, setDisplayLimit] = useState(10);

    const selectOptions = plantes.map(plante => {
        return {label: capitalize(plante.name), value: plante.name}
    });
    
    const showMore = () => {
        setDisplayLimit(displayLimit + 100);
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
        setDisplayLimit(10);
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

            accumulator.sort((a, b) => a.length > b.length ? -1 : a.length < b.length ? 1 : 0);
            let tmp = [];
            let result = [];
            accumulator.forEach(el => {
                if (el.length === accumulator[0].length){
                    tmp.push(el);
                }
            });
            
            tmp.sort((a, b) => {
                let lvlA = a.reduce((acc, curr) => acc + curr.level, 0);
                let lvlB = b.reduce((acc, curr) => acc + curr.level, 0);
                if (lvlA > lvlB){
                    return -1;
                }
                
                else if (lvlA < lvlB){
                    return 1;
                }
                
                else {
                    return 0;
                }
            });
            const upperAffinity = tmp[0].reduce((acc, curr) => acc + curr.level, 0);
            console.log(upperAffinity);
            tmp.forEach(el => {
                if (el.reduce((acc, curr) => acc + curr.level, 0) === upperAffinity){
                    result.push(el);
                }
            });
            console.log(result);
            return {general: accumulator, best: result};
        }
    };

    const launchComp = async (e) => {
        generateComp(e).then(res => {
            setCompositions([...res.general]);
            setBests([...res.best]);
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
            
            <h3>Légende:</h3>
            <ul className="legend">
                <li className="darkGreen">Affinité faible</li>
                <li className="mediumGreen">Affinité forte</li>
                <li className="lightGreen">Affinité très forte</li>
            </ul>
            
            <ul>
                {compAreCreated ?
                    <p>{compositions.length} {compositions.length > 1 ? "compositions générées" : "composition générée"} </p> : ""}
                {compAreCreated ? <p>{`Voici ${bests.length > 1 ? `les ${bests.length}` : "le"}  meilleur${bests.length > 1 ? "s" : ""} résultat${bests.length > 1 ? "s" : ""}`}</p> : ""}
                {compAreCreated ?
                    bests.filter(comp => bests.indexOf(comp) < displayLimit).map(comp => {
                        return (
                            <li>
                                <ol className="composition">
                                    {comp.map(item => {
                                        return (
                                            <li className="compItem" style={{
                                                display: 'block',
                                                color: `${item.level === 1 ? '#fff' : '#000'}`,
                                                backgroundColor: `rgb(${50 * item.level}, ${85 * item.level}, ${50 * item.level})`,
                                                padding: '1.5rem'
                                            }}>
                                                {item.plant.name} {item.level}
                                            </li>
                                        )
                                    })}
                                </ol>
                            </li>
                        )
                    }) : generating ? <p>Génération en cours...</p> : ""
                }
                
            </ul>
            {compAreCreated && bests.length > displayLimit ? <button onClick={showMore}>Voir plus</button> : ""}
        </div>
    );
};

export default CompositionPlante;



