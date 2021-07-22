import React from "react";
import { useDispatch,useSelector } from 'react-redux';
import { useState,useEffect } from "react";
import { getActivities } from "../../actions/index";
import { NavLink } from 'react-router-dom';


export default function FilterActs() {
    const dispatch = useDispatch();
    const [nameAct,setNameAct] = useState(-1);

    const allActivities = useSelector((state) => state.activities);

    useEffect(() => {
        dispatch(getActivities());
    },[dispatch]);

   
    const  handleChange = (e) => {
       const opcion = e.target.value
       setNameAct(opcion)
    }

 
    return (
        <div className="divFilter">  
                      <h3>Tipo actividad</h3>
                     <select name="activity" id ="selActivities">
                         <option value={-1}>Seleccione una opcion</option>
                      {allActivities.map((activ,i) => 
                      <option onClick={(event) =>handleChange(event)} key={"actividades"+i} value={i}>{activ.nameAct}</option>
                      )}
                     </select>
                     <div >
                    <h3>Paises</h3>
                     <div name="country" id="selCountries">
                         {nameAct > -1 && (allActivities[nameAct].countries.map((a,i) => (
                             <ul>
                             <img src={a.flag} alt="flag filter" />
                             <h2 value="">{a.name}</h2>
                             <h2>{a.region}</h2>
                             </ul>
                         )))}
                     </div>
                    </div>
                 <NavLink to="/home">
                <button>Volver</button>
            </NavLink>
        </div>
    );
}