import React from "react";
import {useState,useEffect} from "react";
import {useHistory } from 'react-router-dom';
import { postActivity,getNameCountriesForm,clearNameCountriesFrom } from "../../actions/index";
import { useDispatch, useSelector } from 'react-redux';
import "./Activity.css"

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
        window.location.href = window.location.href;
    }

    const handleBack= (e) => {
        e.preventDefault();
        history.push("/home");
        dispatch(clearNameCountriesFrom());
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
        <body className="divform">
            <form className="formact" onSubmit={(e) => {handleSubmit(e)}} >
            <div className="container">
            <input className="inp"  type="text" placeholder="Nombre" onChange={(e) => {handleNameAct(e)}}/>
        <label className="text">
            Dificultad: 
            <select className="select" onChange={(e) => {handleDifficult(e)}}>
                <option value="">Dificultad</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
         </label> <br/>
            <input className="inp"  type="text" placeholder="Duracion" onChange={(e) => {handleDuration(e)}}/> 
            <label className="text">
                Estacion: 
             <select className="select" onChange={(e) => {handleSeason(e)}}>
                 <option value="">Estacion</option>
                <option value="Verano">Verano</option>
                <option value="Invierno">Invierno</option>
                <option value="Primavera">Primavera</option>
                <option value="Otoño">Invierno</option>
             </select>
            </label><br/>
            <input className="inp" type="text" placeholder="Buscar pais" onChange={(e) => handleCountryName(e)}/>
            <button className="butac" type="submit" onClick={(e) => handleGetCountryName(e)}>Buscar</button>
            <div className="containermid">
            <input className="butac2" type="submit" name="crear" placeholder="crear"/>
            <button className="butac3" onClick={(e) => {handleReload(e)}}>Crear nueva actividad</button>
            </div>
            </div>
            <span className="cardact">
                {countryObj.map((c) => (
                    <span    className="countryObjInt" key={c.id}>
                        <button className="x" onClick={(e) => handleDeleteCountry(e,c.id)}>X</button>
                        <img src={c.flag} alt="img not found"  width="200px" height="200px"/>
                        <span>{c.name}</span>
                        
                    </span>
                ))}
            </span>
            </form>
            <footer>
                <button onClick={(e) => {handleBack(e)}}  className="butvol" >Volver</button>
            </footer>
        </body>
    )

}