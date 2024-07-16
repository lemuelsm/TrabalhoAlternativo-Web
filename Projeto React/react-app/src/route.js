import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
        </div>
    );
};

const Sobre = () => {
    return (
        <div>
            <h1>Sobre</h1>
        </div>
    );
};

const Usuario = () => {
    return(
        <div>
            <h1>Usuario</h1>
        </div>
    );
}

const Routes = () => {
    return(
        <BrowserRouter>
            <Route component={ Home }  />
            <Route component={ Sobre }  />
            <Route component={ Usuario } />

        </BrowserRouter>
    );
}

export default Routes;