//initialized with "npx create-react-app"
import React, {useState, useEffect} from "react";
import AddPlante from './Components/AddPlante'
import ModifyPlante from './Components/ModifyPlante'
import CompositionPlanteGeneral from "./Components/CompositionPlante";
import DeletePlanteModal from "./Components/DeletePlanteModal";
import WelcomeScreen from "./Components/WelcomeScreen";
import {BrowserRouter, Link, Switch, Route} from "react-router-dom";
import Requests from "./Request/Requests";

export default function App() {

    const [plantes, setPlantes] = useState([]);
    
    //get plantes from DB and set them into state
    useEffect(() => {
        Requests.fetchData('/vegetables', res => setPlantes(res));
    }, []);

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
                        <WelcomeScreen plantes={plantes}/>
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
