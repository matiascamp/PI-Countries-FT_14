import React from "react";
import { useDispatch,useSelector } from 'react-redux';
import { useState,useEffect } from "react";
import { getActivities } from "../../actions/index";
import { NavLink } from 'react-router-dom';
import "./FilterActs.css";

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
        <div className="containertypeact">
                      <h3>Tipo actividad :</h3>
                     <select className="selectact" name="activity" id ="selActivities">
                         <option value={-1}>Seleccione una opcion</option>
                      {allActivities.map((activ,i) => 
                      <option onClick={(event) =>handleChange(event)} key={"actividades"+i} value={i}>{activ.nameAct}</option>
                      )}
                     </select>
                     </div>
                     <div >
                    <h3>Pais</h3>
                     <div name="country" id="selCountries">
                         {nameAct > -1 && (allActivities[nameAct].countries.map((a) => (
                             <ul>
                             <img src={a.flag} alt="flag filter" height="300px" width="400px" />
                             <div value="">{a.name}</div>
                             <div>{a.region}</div>
                            </ul>
                         )))}
                     </div>
                    </div>
                 <NavLink to="/home">
                <button className="buttonvol">Volver</button>
            </NavLink>
        </div>
    );
}