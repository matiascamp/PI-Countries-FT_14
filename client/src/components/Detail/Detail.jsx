import React from "react";
import { getDetail } from "../../actions/index";
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import "./Detail.css"



export default function Detail(props) {

    const dispatch= useDispatch();
    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    },[dispatch]);

    const myCountry = useSelector((state) => state.detail);
    
    let myActs = myCountry.activities || [];

    return (
        <header className="grandiv">
        <div className="card">
                <h1 className="title">{myCountry.name}</h1>
                <img src={myCountry.flag} alt="" height="400px" width="550px"/>
                <div className="textc">
                <div >Continente: {myCountry.region}</div>
                <div>Codigo de 3 letras: {myCountry.alpha3Code}</div>
                <div>Capital: {myCountry.capital}</div>
                <div>Subregion: {myCountry.subregion}</div>
                <div>Area: {myCountry.area} km2</div>
                <div>Poblacion: {myCountry.population}</div>
                </div>
                <div className="textc">Actividades: {myActs.map(act => 
                             <span className="subtextact">
                             <div>Tipo: {act.nameAct}</div>
                             <div>Dificultad: {act.difficult}</div>
                             <div>Duracion: {act.duration} semanas</div>
                             <div>Estacion: {act.season}</div>
                             </span>)} 
                </div>
            <NavLink to="/home">
                <button className="buttondetail">Volver</button>
            </NavLink>
        </div>
        </header>
    )
}