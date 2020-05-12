//initialized with "npx create-react-app"
import React, {useState} from "react";
import AddPlante from './Components/AddPlante'
import ModifyPlante from './Components/ModifyPlante'
import SearchPlante from "./Components/SearchPlante";
import DeletePlanteModal from "./Components/DeletePlanteModal";
import {BrowserRouter, Link} from "react-router-dom";

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

    return (
        <div className="App">
            <BrowserRouter>
                <ul>
                    <li><Link to="/plantes/ajouter">Ajouter plante</Link></li>
                    <li><Link to="/composition/create">Créer composition</Link></li>
                </ul>

                <SearchPlante plantes={plantes}/>

                <AddPlante plantes={plantes} setPlantes={setPlantes}/>

                <ModifyPlante plantes={plantes} setPlantes={setPlantes}/>

                <DeletePlanteModal/>
                <div>
                    <a href="#">&#60;</a>
                    <h2>Créer composition</h2>
                    <SearchPlante plantes={plantes}/>
                </div>
            </BrowserRouter>
        </div>
    );
}
