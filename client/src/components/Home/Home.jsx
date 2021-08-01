import React from "react";
import { NavLink } from 'react-router-dom';
import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import {getCountries } from "../../actions/index"
import CountryCard from "../CountryCard/CountryCard";
import SearchBar from "../SearchBar/SearchBar";
import './Home.css'



export default function Home() {
    const dispatch = useDispatch();
    const [pages,setPages] = useState(0);//SETEO EL ESTADO INICIAL LOCAL DESDE DONDE COMIENZA A CONTAR EN EL PAGINADO
    const [order,setOrder] = useState("ASC") //SETEO EL ESTADO INICIAL LOCAL EN QUE VA A COMENZAR EL ORDEN EN QUE MUESTRO LOS PAISES
    const [filtro,setFiltro] = useState("")  //SETEO EL ESTADO INICIAL LOCAL DEL FILTRO
    const [tipo,setTipo] = useState("name")
    

    useEffect(() => {
        dispatch(getCountries(pages,order,filtro,tipo));
    },[dispatch,pages,order,filtro,tipo]);//EL ARRRAY DE DEPENDENCIAS VA A ESCUCHAR A QUE VARIABLES VA A ACTUALIZAR

    const allCountries = useSelector((state) => state.countries);


    const handleClick = (e) => {
        e.preventDefault();
        window.location.href = window.location.href;
        dispatch(getCountries(pages,order,filtro,tipo))
    };

    //PAGINADO
    const prev= (e) => {
        e.preventDefault();
        if(pages <= 0) {
            setPages(0);
        }else {
            setPages(pages-10)
        }
    };

    const next = (e) => {
        e.preventDefault();
        if(allCountries.length < 10) {
            return;
        } else {
            setPages(pages + 10);
        }
    };

    //ORDENAMIENTO
    const changeTipo = (e) => {
        e.preventDefault();
        setTipo(e.target.value)
    }
    const changeOrder = (e) => {
        e.preventDefault();
        setOrder(e.target.value);
    };

    //FILTRADO
    const changeFiltro = (e) => {
        e.preventDefault();
        setFiltro(e.target.value)
    };

    //-------RETORNO-------
    return (
        <div className="divHome">
            <nav >
            <SearchBar />
            </nav>
            <nav className="conteinernav">
            <button className="buttonreload" onClick={(e) => {handleClick(e)}}>Volver a cargar todos los paises</button>
            <NavLink to="/activity">
            <button  className="butact" >Crear Actividad</button>
             </NavLink>
           </nav>
           <div className="containerfilt">
            <div className="filtercountry">
                <h5 className="textfilcount">Filtrar por continente</h5>
                <select className="selectcountry" onChange={(e) => changeFiltro(e)}>
                    <option value="">Sin filtrado</option>
                    <option value="Americas">America</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europa</option>
                    <option value="Africa">Africa</option>
                    <option value="Oceania">Oceania</option>
                </select>
            </div>
                <NavLink to="/filter">
                <button className="butact2">Filtrar actividad</button>
                </NavLink>
            <div className="filtercountries">
                <h5>Ordenar por </h5>
                <select className="selectcountry"  onChange={(e) => changeTipo(e)}>
                    <option value="name">Alfabeticamente/Nombre</option>
                    <option value="population">Poblacion</option>
                </select>
                <select className="selectcountry"  onChange={(e) => changeOrder(e)}>
                    <option value="ASC">Ascendente</option>
                    <option value="DESC">Descendente</option>
                </select>    
            </div>
            </div>
            <div className="countries">
            {allCountries.map((c) => {
                return (
                 <React.Fragment>
                     <NavLink to={"/home/" + c.id}>
                      <CountryCard name={c.name} flag={c.flag} region={c.region} key={c.code3Alpha} />
                     </NavLink>
                 </React.Fragment>
                );
            })}
            </div>
            <footer>
            <button className="buttonpage1" onClick={(e) => {prev(e)}} disabled={pages <= 0}>{"Prev"}</button>
            <button className="buttonpage2" onClick={(e) => {next(e)}} disabled={allCountries.length < 10}>{"Next"}</button>
            </footer>
        </div>
    )

}

