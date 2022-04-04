import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {connect, useDispatch} from 'react-redux';
import Layout from "../src/layouts/Layout";
import axios from "axios";
import {apiUrl} from "../config/apiConfig";
import {AUTHENTICATED_FAIL, AUTHENTICATED_SUCCESS} from "../src/redux/action/type";
import {load_user, set_authenticate} from "../src/redux/action/auth";

const ProtectedRoute = ({isAuthenticated, children}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(() => {
        let mounted = true;
        if (mounted) {
            if (typeof window !== 'undefined') {
                if (!localStorage.getItem('access')) {
                    // console.log("protected Use");
                    router.push('/login');
                } else {
                    const config = {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    };
                    const body = JSON.stringify({token: localStorage.getItem('access')});
                    axios.post(`${apiUrl}auth/jwt/verify/`, body, config).then((response) => {
                        console.log("response", response);
                        if(response) {
                            dispatch(set_authenticate());
                            dispatch(load_user());
                        } else {
                            router.push('/login');
                        }
                    }).catch((error) => {
                        console.log("error", error);
                        router.push('/login');
                    });
                }
                
            } else {
                router.push('/login');
            }
        }
        return () => {
            mounted = false;
        }
    }, []);
    // useEffect(() => {
    //     let mounted = true;
    //     if (mounted) {
    //         console.log("isAuthenticated", isAuthenticated)
    //         if (!isAuthenticated) {
    //             router.push('/login');
    //         }
    //         else {
    //
    //         }
    //     }
    //     return () => {
    //         mounted = false;
    //     };
    // }, [isAuthenticated]);
    
    return (
        <Layout>
            {children}
        </Layout>
    );
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
};
export default connect(mapStateToProps, {set_authenticate})(ProtectedRoute);