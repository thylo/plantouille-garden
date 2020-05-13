import React from "react";
import SearchPlante from "./SearchPlante";

/**
 * This component is the main screen when you arrive on the app
 * @param plantes
 * @returns {*}
 * @constructor
 */
const WelcomeScreen = ({plantes}) => {
    return(
        <div>
            <h2>Toutes les plantes</h2>
            <SearchPlante plantes={plantes}/>
        </div>
    );
};

export default WelcomeScreen;