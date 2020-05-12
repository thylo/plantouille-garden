//initialized with "npx create-react-app"
import React, {useState} from "react";
import AddPlante from './Components/AddPlante'
import ModifyPlante from './Components/ModifyPlante'
import CompositionPlanteGeneral from "./Components/CompositionPlante";
import DeletePlanteModal from "./Components/DeletePlanteModal";
import {BrowserRouter, Link, Switch, Route} from "react-router-dom";
import WelcomeScreen from "./Components/WelcomeScreen";
import getAllPlantes from "./Request/Requests"

const axios = require('axios').default;
const BASE = "http://localhost:1337";

export default function App() {

    //DEV
    const [plantes, setPlantes] = useState([
        {
            id: 0,
            nom: "tomate",
            pros: ["poireau", "pomme de terre", "navet"],
            cons: ["concombre", "radis", "salade"]
        },
        {
            id: 1,
            nom: "pomme de terre",
            pros: ["poireau", "tomate", "navet"],
            cons: ["concombre", "radis", "salade"]
        }
    ]);

    let data = async () => {
        await axios.get(BASE + "/vegetables").then(response => {
            setPlantes(response.data)
        }).catch(error => console.log(error));
    };
    data();

    return (
        <div className="App">
            <div>
            </div>
            <BrowserRouter>
                <ul>
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="/plantes/ajouter">Ajouter plante</Link></li>
                    <li><Link to="/composition">Mes compositions</Link></li>
                </ul>
                
                <Switch>
                    <Route path="/composition">
                        <CompositionPlanteGeneral plantes={plantes}/>
                    </Route>
                    <Route path="/">
                        <WelcomeScreen plantes={plantes} />
                    </Route>
                </Switch>

                <Route path="/plantes/ajouter">
                    <AddPlante plantes={plantes} setPlantes={setPlantes}/>
                </Route>
                <Route path="/plantes/modifier/:planteId">
                    <ModifyPlante plantes={plantes} setPlantes={setPlantes}/>
                </Route>
                <Route path="/plante/suprimer/:planteId">
                    <DeletePlanteModal plantes={plantes} setPlantes={setPlantes}/>
                </Route>
            </BrowserRouter>
        </div>
    );
}
