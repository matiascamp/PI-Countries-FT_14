import React from "react";
import { useDispatch } from 'react-redux';
import { useState } from "react";
import { getCountriesName } from "../../actions/index";
import  "./SearchBar.css";


export default function SearchBar() {
    const dispatch = useDispatch();
    const [name,setName] = useState("")

    const handleInputChange = (event) => {
        event.preventDefault();
        setName(event.target.value);
    };
    
    const handleClick= (event) => {
        event.preventDefault();
        dispatch(getCountriesName(name))
    };

    return (
        <div className="divSearch">
            <input className="inputsearch" type="text" placeholder="Buscar... " onChange={(e) => handleInputChange(e)} />
            <button className="buttonsearch" onClick={(e) => handleClick(e)}>Buscar</button>
        </div>
    );
}