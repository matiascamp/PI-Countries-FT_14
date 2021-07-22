const initialState = {
    countries:  [],
    activities: [],
    countriesForm: [],
    detail: []
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_COUNTRIES":
            return {
                ...state,
                countries: action.payload
            }
            case "GET_ACTIVITIES":
            return {
                ...state,
                activities: action.payload
            }
        case "GET_NAME_COUNTRIES":
            return {
                    ...state,
                    countries:action.payload
            }
            case "GET_NAME_COUNTRIES_FORM":
            return {
                    ...state,
                    countriesForm:action.payload
            }
        case "CLEAR_NAME_COUNTRIES_FORM":
            return {
                    ...state,
                    countriesForm:[]
            }
        case "GET_DETAIL":
            return {
                ...state,
                detail:action.payload
            }
        default:
            return state;
    }
}