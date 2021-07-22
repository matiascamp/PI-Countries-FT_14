import React from "react";
import { NavLink } from 'react-router-dom';

export function Landing() {
    return (
        <div>
         <h1>Web PI de Paises</h1>
         <NavLink to="/home">
             <button>Ingresar</button>
         </NavLink>
        </div>
    );
}

export default Landing;