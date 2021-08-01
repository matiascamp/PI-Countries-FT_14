import React  from 'react';
import "./CountryCard.css"

export default function CountryCard(props) {
    return (
        <ul className="cards">
            <img src={props.flag} alt="img country flag" width="200px" height="200px" />
            <span>Pais: {props.name}</span>
            <span>Continente: {props.region}</span>
        </ul>
    );
}
