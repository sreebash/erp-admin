import axios from "axios";

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT,
    AUTH_ERROR
} from "./type";
import {apiUrl} from "../../../config/apiConfig";
import {error} from "next/dist/build/output/log";

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
            payload:{
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
        // payload: {
        //     auth: false,
        // }
    });
    
    dispatch({
        type: AUTH_ERROR,
        payload:{
            msg: 'Logged Out!',
            auth: true
        },
    })
    
}