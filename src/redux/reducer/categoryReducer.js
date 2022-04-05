import {
    CATEGORY_LIST,
    
} from "../action/type";

const initialState = {
    access: null,
    refresh: null,
    isAuthenticated: false,
    user: null,
    
};


export default function (state = initialState, action) {
    const {type, payload} = action;
    
    switch (type) {
        case CATEGORY_LIST:
            return {
                ...state,
                isAuthenticated: true
            }
        
        
        default:
            return state
    }
}

