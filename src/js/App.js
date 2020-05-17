//initialized with "npx create-react-app"
import React, {useState, useEffect} from "react";
import AddPlante from './Components/AddPlante'
import ModifyPlante from './Components/ModifyPlante'
import CompositionPlanteGeneral from "./Components/CompositionPlante";
import DeletePlanteModal from "./Components/DeletePlanteModal";
import WelcomeScreen from "./Components/WelcomeScreen";
import PlanteDetails from "./Components/PlanteDetails";
import {BrowserRouter, Link, Switch, Route} from "react-router-dom";
import {fetchData} from "./Request/Requests";

export default function App() {

    const [plantes, setPlantes] = useState([]);
    
    //get plantes from DB and set them into state at mount
    useEffect(() => {
        fetchData('/plants', res => setPlantes(res));
    }, []);

    return (
        <div className="App">
            <div>
            </div>
            <BrowserRouter>
                
                {/*Always there*/}
                <ul>
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="/composition">Mes compositions</Link></li>
                    <li><Link to="/calendrier">Calendrier</Link></li>
                    <li><Link to="/plantes/ajouter">Ajouter une plante</Link></li>
                </ul>

                {/*Switching*/}
                <Switch>
                    <Route path="/calendrier">
                        <h2>Calendrier</h2>
                    </Route>
                    <Route path="/composition">
                        <CompositionPlanteGeneral plantes={plantes}/>
                    </Route>
                    <Route path="/">
                        <WelcomeScreen plantes={plantes}/>
                    </Route>
                </Switch>

                {/*Potentially accessible from anywhere*/}
                <Route path="/plantes/ajouter">
                    <AddPlante plantes={plantes}/>
                </Route>
                <Route path="/plantes/modifier/:planteId">
                    <ModifyPlante plantes={plantes} setPlantes={setPlantes}/>
                </Route>
                <Route path="/plantes/suprimer/:planteId">
                    <DeletePlanteModal plantes={plantes} setPlantes={setPlantes}/>
                </Route>
                <Route path="/plantes/details/:planteId">
                    <PlanteDetails plantes={plantes}/>
                </Route>
            </BrowserRouter>
        </div>
    );
}
