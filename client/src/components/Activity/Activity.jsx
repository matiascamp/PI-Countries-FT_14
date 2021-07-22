import React from "react";
import {useState,useEffect} from "react";
import { NavLink,useHistory } from 'react-router-dom';
import { postActivity,getNameCountriesForm,clearNameCountriesFrom } from "../../actions/index";
import { useDispatch, useSelector } from 'react-redux';

export default function Activity () {
    const dispatch = useDispatch();
    const history = useHistory();

    const countries = useSelector((state) => state.countriesForm);
    const [nameAct,setNameAct] = useState("");
    const [difficult,setDifficult] = useState("");
    const [duration,setDuration] = useState("");
    const [season,setSeason] = useState("");
    const [countryid,setcountryid] = useState([]);
    const [countryName,setCountryName] = useState("");
    const [countryObj,setCountryObj] = useState([]);

    useEffect(() => {
        setCountryObj([...countryObj,...countries]);
        setcountryid([...new Set(countryObj.map((c) => c.id))])
    },[dispatch, countries]);

    useEffect(() => {
        setcountryid([...new Set(countryObj.map((c) => c.id))]);
    },[dispatch,countryObj]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postActivity(nameAct,difficult,duration,season,countryid));
        alert("La actividad se ha creado");
        dispatch(clearNameCountriesFrom());
    }
    const handleReload = (e) => {
        e.preventDefault();
        history.push("/activity"); 
        window.location.href = window.location.href;
    }

    const handleNameAct = (e) => {
        e.preventDefault();
        setNameAct(e.target.value)
    }

    const handleDifficult = (e) => {
        e.preventDefault();
        setDifficult(e.target.value)
    }

    const handleDuration = (e) => {
        e.preventDefault();
        setDuration(e.target.value)
    }

    const handleSeason = (e) => {
        e.preventDefault();
        setSeason(e.target.value)
    }

    const handleCountryName = (e) => {
        e.preventDefault();
        setCountryName(e.target.value)
    }

    const handleGetCountryName = (e) => {
        e.preventDefault();
        dispatch(getNameCountriesForm(countryName));
    };

    const handleDeleteCountry = async  (e, id) => {
        e.preventDefault();
        setCountryObj(countryObj.filter((c) => c.id !== id));
        setcountryid([...new Set(countryObj.map((c) => c.id))])
    };

    return (
        <div>
            <form onSubmit={(e) => {handleSubmit(e)}} >
            <input name="Nombre" type="text" placeholder="Nombre" onChange={(e) => {handleNameAct(e)}}/>
        <label>
            Dificultad: 
            <select onChange={(e) => {handleDifficult(e)}}>
                <option value="">Dificultad</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
         </label>
            <input name="Duracion" type="text" placeholder="Duracion" onChange={(e) => {handleDuration(e)}}/>
            <label>
                Estacion: 
             <select onChange={(e) => {handleSeason(e)}}>
                 <option value="">Estacion</option>
                <option value="Verano">Verano</option>
                <option value="Invierno">Invierno</option>
                <option value="Primavera">Primavera</option>
                <option value="Otoño">Invierno</option>
             </select>
            </label>
            <input type="text" placeholder="Buscar pais" onChange={(e) => handleCountryName(e)}/>
            <button type="submit" onClick={(e) => handleGetCountryName(e)}>Buscar</button>
            <div>
                {countryObj.map((c) => (
                    <div className="countryObjInt" key={c.id}>
                        <button onClick={(e) => handleDeleteCountry(e,c.id)}>X</button>
                        <img src={c.flag} alt="img not found"  width="200px" height="200px"/>
                        <h5>{c.name}</h5>
                    </div>
                ))}
            </div>
            <input type="submit" />
            </form>
            <div>
            <button onClick={(e) => {handleReload(e)}}>Crear nueva actividad</button>
            </div>
            <NavLink to="/home">
                <button>Volver</button>
            </NavLink>
        </div>
    )

}