import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT,
    AUTH_ERROR,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL
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
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        
        
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access);
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null
            }
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload
            }
        
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null
            }
        
        case AUTH_ERROR:
            return {
                ...state,
                authErrors: payload,
            };
        
        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_CONFIRM_FAIL:
            return {
                ...state
            }
        
        default:
            return state
    }
}

