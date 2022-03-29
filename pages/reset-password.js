import Router from "next/router";
import React, {useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";
import {reset_password} from "../src/redux/action/auth";


const ResetPassword = ({reset_password}) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
    });
    
    const dispatch = useDispatch()
    const {email} = formData;
    
    const [active, setActive] = useState(2);
    
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    
    const onSubmit = e => {
        e.preventDefault();
        reset_password(email);
        setRequestSent(true)
    };
    
    
    if (requestSent) {
        Router.push('/')
    }
    
    
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
                        <h1> Request Password Reset:</h1>
                        <form onSubmit={e => onSubmit(e)}>
                            <div className="form-group">
                                <input type="email" className="form-control" placeholder="Email" name="email" required
                                       onChange={onChange}/>
                            </div>
                            <button className="btn btn-primary" type="submit">Reset Password</button>
                        
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default connect(null, {reset_password})(ResetPassword);
