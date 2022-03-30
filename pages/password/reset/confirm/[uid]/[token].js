import Router, {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";
import {logout, reset_password_confirm} from "../../../../../src/redux/action/auth";
import axios from "axios";
import {apiUrl} from "../../../../../config/apiConfig";


const ResetPasswordConfirm = ({reset_password_confirm}) => {
    const [requestSent, setRequestSent] = useState(false);
    const router = useRouter();
    console.log(router);
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: '',
    });
    
    const dispatch = useDispatch()
    const {new_password, re_new_password} = formData;
    
    const [active, setActive] = useState(2);
    
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    
    const onSubmit = e => {
        e.preventDefault();
        const uid = router.query.uid;
        const token = router.query.token;
        reset_password_confirm(uid, token, new_password, re_new_password);
        setRequestSent(true);
    };
    
    
    if (requestSent) {
        router.push('/')
    }
    
    
    // useEffect(() => {
    //     const uid = router.query.uid;
    //     const token = router.query.token;
    //     if (uid && token !== true) {
    //         router.push('/login')
    //     }
    // })
    
    
    return (
        <div className="authincation d-flex flex-column flex-lg-row flex-column-fluid">
            <div className="login-aside text-center  d-flex flex-column flex-row-auto">
                <div className="d-flex flex-column-auto flex-column pt-lg-40 pt-15">
                    <div className="text-center mb-4 pt-5">
                        <img src="/images/logo-full.png" alt=""/>
                    </div>
                    <h3 className="mb-2">Welcome back!</h3>
                    <p>
                        User Experience &amp; Interface Design <br/>
                        Strategy SaaS Solutions
                    </p>
                </div>
                <div
                    className="aside-image"
                    style={{backgroundImage: "url(/images/background/pic1.svg)"}}
                />
            </div>
            <div
                className="container flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto">
                <div className="d-flex justify-content-center h-100 align-items-center">
                    <div className="authincation-content style-2">
                        <h1> Confirm Password Reset:</h1>
                        <form onSubmit={e => onSubmit(e)}>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="New Password"
                                       value="new_password" name="new_password" minLength='6'
                                       required onChange={onChange}/>
                            </div>
                            
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Confirm New Password"
                                       value="re_new_password" name="re_new_password" minLength='6'
                                       required onChange={onChange}/>
                            </div>
                            <button className="btn btn-primary" type="submit">Reset Password Confirm</button>
                        </form>
                    
                    </div>
                </div>
            </div>
        </div>
    );
};


export default connect(null, {reset_password_confirm})(ResetPasswordConfirm);
