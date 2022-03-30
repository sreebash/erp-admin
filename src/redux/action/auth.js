import axios from "axios";

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
    PASSWORD_RESET_CONFIRM_FAIL,
} from "./type";
import {apiUrl} from "../../../config/apiConfig";
import {error} from "next/dist/build/output/log";
import {route} from "next/dist/next-server/server/router";

export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        
        const body = JSON.stringify({token: localStorage.getItem('access')});
        
        try {
            const res = await axios.post(`${apiUrl}auth/jwt/verify/`, body, config)
            if (res.data.code !== 'token_not_valid') {
                
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
                
                
            } else {
                
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
                
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }
        
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};

export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };
        
        try {
            const res = await axios.get(`${apiUrl}auth/users/me/`, config)
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
            localStorage.setItem('users', JSON.stringify(res.data))
        } catch (error) {
            dispatch({
                type: USER_LOADED_FAIL,
            });
        }
        
        
    } else {
        dispatch({
            type: USER_LOADED_FAIL,
        });
    }
};

export const set_authenticate = () => async dispatch => {
    dispatch({
        type: AUTHENTICATED_SUCCESS,
    });
};
export const login = (values) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify(values);
    
    try {
        const res = await axios.post(`${apiUrl}auth/jwt/create/`, body, config)
        console.log(res)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                access: res.data.access,
                refresh: res.data.refresh
            }
        });
        
        dispatch({
            type: AUTH_ERROR,
            payload: {
                msg: 'Login successfully completed',
                auth: true
            },
        })
        dispatch(load_user())
        
        
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
        });
    }
};

export const logout = () => dispatch => {
    console.log("Logout")
    dispatch({
        type: LOGOUT,
    });
    
    localStorage.removeItem('users')
    
    
    dispatch({
        type: AUTH_ERROR,
        payload: {
            msg: 'Logged Out!',
            auth: true
        },
    })
    
}

export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({email});
    try {
        await axios.post(`${apiUrl}auth/users/reset_password/`, body, config);
        dispatch({
            type: PASSWORD_RESET_SUCCESS
        })
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        });
    }
};

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    const body = JSON.stringify({uid, token, new_password, re_new_password});
    
    try {
        await axios.post(`${apiUrl}auth/users/reset_password_confirm/`, body, config)
        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        })
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        });
    }
    
    
}