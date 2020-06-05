//initialized with "npx create-react-app"
import React, {useState, useEffect} from "react";
import AddPlante from './Components/General/AddPlante'
import ModifyPlante from './Components/General/ModifyPlante'
import CompositionPlanteGeneral from "./Components/Composition/CompositionPlante";
import DeletePlanteModal from "./Components/General/DeletePlanteModal";
import WelcomeScreen from "./Components/General/WelcomeScreen";
import PlanteDetails from "./Components/General/PlanteDetails";
import {BrowserRouter, Link, Switch, Route} from "react-router-dom";
import {fetchData} from "./Request/Requests";

export default function App() {

    const [plantes, setPlantes] = useState([]);
    const refreshPlantes = () => fetchData('/plants', res => setPlantes(res));
    
    //get plantes from DB and set them into state at mount
    useEffect(() => {
        refreshPlantes()
    }, []);

    return (
        <div className="App">
            <div>
            </div>
            <BrowserRouter>
                
                {/*Always there*/}
                <ul className="mainnav">
                    <li className="nav__item"><Link to="/" className="nav__link">Accueil</Link></li>
                    <li className="nav__item"><Link to="/composition" className="nav__link">Créer composition</Link></li>
                    <li className="nav__item"><Link to="/calendrier" className="nav__link">Calendrier</Link></li>
                    <li className="nav__item"><Link to="/plantes/ajouter" className="nav__link">Ajouter une plante</Link></li>
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
                    <AddPlante plantes={plantes} refresh={refreshPlantes}/>
                </Route>
                <Route path="/plantes/modifier/:planteId">
                    <ModifyPlante plantes={plantes} refresh={refreshPlantes}/>
                </Route>
                <Route path="/plantes/suprimer/:planteId">
                    <DeletePlanteModal plantes={plantes} refresh={refreshPlantes}/>
                </Route>
            </BrowserRouter>
        </div>
    );
}
