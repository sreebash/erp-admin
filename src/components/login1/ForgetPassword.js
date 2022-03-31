import Router from "next/router";
import React, {useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";
import {reset_password} from '../../../src/redux/action/auth';


const ForgotPassword = ({reset_password}) => {
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
    
    
    return (<div
            className="container flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto">
            <div className="d-flex justify-content-center h-100 align-items-center">
                <div className="authincation-content style-2">
                    <h1> Request Password Reset:</h1><br/>
                    <strong>Email</strong>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <input type="email" className="form-control" placeholder="Email" name="email" required
                                   onChange={onChange}/>
                        </div>
                        <button className="btn btn-primary" type="submit">Reset Password</button>
                    
                    </form>
                </div>
            </div>
        </div>);
};


export default connect(null, {reset_password})(ForgotPassword);
