import React from "react";
import SearchPlante from "./SearchPlante";

const WelcomeScreen = ({plantes}) => {
    return(
        <div>
            <h2>Toutes les plantes</h2>
            <SearchPlante plantes={plantes}/>
        </div>
    );
};

export default WelcomeScreen;