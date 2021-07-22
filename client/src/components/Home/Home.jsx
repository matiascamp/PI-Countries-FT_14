import React from "react";
import { NavLink } from 'react-router-dom';
import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import {getCountries } from "../../actions/index"
import CountryCard from "../CountryCard/CountryCard";
import SearchBar from "../SearchBar/SearchBar";



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
    //console.log("TODOS LOS PAISES: ", allCountries)
   

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
            <NavLink to="/activity">Crear actividad</NavLink>
            <button onClick={(e) => {handleClick(e)}}>Volver a cargar todos los paises</button>
            <SearchBar />
            <div>
                <h5>Filtrar por continente</h5>
                <select onChange={(e) => changeFiltro(e)}>
                    <option value="">Sin filtrado</option>
                    <option value="Americas">America</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europa</option>
                    <option value="Africa">Africa</option>
                    <option value="Oceania">Oceania</option>
                </select>
            </div>
            <div>
                <NavLink to={"/filter"}>Filtrar por actividad turistica</NavLink>
            </div>
            <div>
                <h5>Ordenar por </h5>
                <select onChange={(e) => changeTipo(e)}>
                    <option value="name">Alfabeticamente/Nombre</option>
                    <option value="population">Poblacion</option>
                </select>
                <select onChange={(e) => changeOrder(e)}>
                    <option value="ASC">Ascendente</option>
                    <option value="DESC">Descendente</option>
                </select>    
            </div>
            {allCountries.map((c) => {
                return (
                 <React.Fragment>
                     <NavLink to={"/home/" + c.id}>
                      <CountryCard name={c.name} flag={c.flag} region={c.region} key={c.code3Alpha} />
                     </NavLink>
                 </React.Fragment>
                );
            })}
            <button onClick={(e) => {prev(e)}} disabled={pages <= 0}>{"<-Prev"}</button>
            <button onClick={(e) => {next(e)}} disabled={allCountries.length < 10}>{"Next->"}</button>
        </div>
    )

}

