import React  from 'react';


export default function CountryCard(props) {
    //console.log("CARD: ",props)
    return (
        <div>
            <img src={props.flag} alt="img country flag" width="100px" height="100px" />
            <h5>Nombre del pais: {props.name}</h5>
            <h5>Continente: {props.region}</h5>
        </div>
    );
}
