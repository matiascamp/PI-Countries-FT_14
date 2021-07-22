import React from "react";
import { getDetail } from "../../actions/index";
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import { NavLink } from "react-router-dom";



export default function Detail(props) {
    //console.log("ESTO ES EL ID?: ",props);
    const dispatch= useDispatch();
    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    },[dispatch]);
    const myCountry = useSelector((state) => state.detail);
    let myActs = myCountry.activities || [];
    //console.log("ESTADO EN REDUX DE MYCOUNTRY: ",myCountry)
    return (
        <div>
            <div>
                <h1>{myCountry.name}</h1>
                <img src={myCountry.flag} alt=""/>
                <h2>Continente: {myCountry.region}</h2>
                <h2>Codigo de 3 letras: {myCountry.alpha3Code}</h2>
                <h2>Capital: {myCountry.capital}</h2>
                <h2>Subregion: {myCountry.subregion}</h2>
                <h2>Area: {myCountry.area} km2</h2>
                <h2>Poblacion: {myCountry.population}</h2>
                <h2>Actividades: {myActs.map(act => <ul><li>Tipo: {act.nameAct}</li>
                                                     <li>Dificultad: {act.difficult}</li>
                                                     <li>Duracion: {act.duration} semanas</li>
                                                     <li>Estacion: {act.season}</li></ul>)} </h2>
            </div>

            <NavLink to="/home">
                <button>Volver</button>
            </NavLink>
        </div>
    )
}