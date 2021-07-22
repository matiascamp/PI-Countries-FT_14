import  axios  from 'axios';


export function getCountries(page,order,filtro,tipo) {
    return async function (dispatch) {
        let json = await axios("http://localhost:3001/countries?page="+ page + "&tipo="+tipo + "&order="+ order + "&filter="+ filtro)
        return dispatch({type: "GET_COUNTRIES", payload: json.data})
    }
}



export function getDetail(id) {
    return async function (dispatch) {
        try {
            let json = await axios ("http://localhost:3001/countries/"+ id);
            return dispatch({type:"GET_DETAIL", payload:json.data})
        } catch (error) {
            console.log(error)
        }
    }
}

export function getCountriesName(name) {
    return async function (dispatch) {
        try {
            let json = await axios("http://localhost:3001/countries?name=" + name);
            return dispatch({ type: "GET_NAME_COUNTRIES", payload: json.data});
        } catch (error) {
            console.log(error);
        }
    };
}

export function getNameCountriesForm(name) {
    return async function (dispatch) {
        try {                               
            let json = await axios("http://localhost:3001/countries?name=" + name);
            return dispatch({ type: "GET_NAME_COUNTRIES_FORM", payload: json.data});
        } catch (error) {
            console.log(error);
        }
    };
}

export function clearNameCountriesFrom () {
    return function (dispatch) {
        return dispatch ({ type: "CLEAR_NAME_COUNTRIES_FORM"})
    }
}


export function getActivities() {
    return async function (dispatch) {                       
        let  json = await axios.get("http://localhost:3001/activity")
        //console.log("JSON DE GETACTIVITIES: ", json.data)
        dispatch({type: "GET_ACTIVITIES", payload: json.data})
    }
}
export function postActivity (nameAct,difficult,duration,season,countryid) {
    return async function () {
        const response = await axios.post("http://localhost:3001/activity", {
            nameAct,
            difficult,
            duration,
            season,
            countryid,
        });
        //console.log(response);
        return response;
    }
}