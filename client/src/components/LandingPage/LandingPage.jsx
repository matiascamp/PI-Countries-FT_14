import React from "react";
import { NavLink } from 'react-router-dom';
import './LandigPage.css'

export default function Landing() {
    
    return (
        <body className="bodylanding">
        <div className="imgpng">
         <h1 className="h1landing">Web PI de Paises</h1>
         <NavLink to="/home">
             <button className = "boton_landing">Ingresar</button>
         </NavLink>
        </div>
        </body>
    );
}

