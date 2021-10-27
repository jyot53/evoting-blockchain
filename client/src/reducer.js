export const initialState = {
    currentaccountAddress : "",
    user : {},
    phase : "Registration",
    candidates : [],
    registeredAddresses : [],
    currentPhase : ""
};

const reducer = (state,action) => {
    switch (action.type) {
        case 'SET_CURRENT_ADDRESS':
            return {
                ...state,
                currentaccountAddress : action.payload 
            };
        case 'SET_PHASE':
            return {
                ...state,
                phase : action.payload 
            };
        case 'SET_USER':
            return {
                ...state,
                user:action.payload,
            }
        default:
            return state;
    }
};

export default reducer;

