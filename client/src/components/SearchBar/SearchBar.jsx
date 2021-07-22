import React from "react";
import { useDispatch } from 'react-redux';
import { useState } from "react";
import { getCountriesName } from "../../actions/index";

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
    console.log("handleInputChange: ",handleInputChange)
    console.log("HADLECLICK: ",handleClick)
    console.log("name: ",name)
    return (
        <div className="divSearch">
            <input type="text" placeholder="Buscar... " onChange={(e) => handleInputChange(e)} />
            <button onClick={(e) => handleClick(e)}>Buscar</button>
        </div>
    );
}