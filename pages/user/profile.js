import {Fragment, useEffect, useState} from "react";
import {connect, useSelector} from "react-redux";
import {moodChange, pageTitle} from "../../src/redux/action/utils";
import axios from "axios";
import {apiUrl} from "../../config/apiConfig";
import ProtectedRoute from "../ProtectedRoute";

const Profile = ({ pageTitle }) => {
    const [userProfileInfo, setUserProfileInfo] = useState([]);
    
    useEffect(() => {
        
        let mounted = true;
        const config = {
            params: {},
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access')
                
            }
        };
        
        if (mounted) {
            pageTitle("Profile");
            axios.get(`${apiUrl}userprofile/`, config)
                .then((response) => {
                    if (mounted) {
                        console.log('userProfileInfo: ', response.data)
                        setUserProfileInfo(response.data);
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        
        return () => {
            mounted = false;
        }
       
    }, []);
    
    return (
        <ProtectedRoute>
                <div className="card">
                    <div className="card-body">
                        <div className="profile-personal-info">
        
        
                            {userProfileInfo.map((profile_info, i) => (
                                <div>
                                    <div className="row mb-2">
                                        <div className="col-sm-3 col-5">
                                            <h5 className="f-w-500">
                                                User Name <span className="pull-right">:</span>
                                            </h5>
                                        </div>
                                        <div className="col-sm-9 col-7">
                                            <span>{profile_info.username}</span>
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-sm-3 col-5">
                                            <h5 className="f-w-500">
                                                First Name <span className="pull-right">:</span>
                                            </h5>
                                        </div>
                                        <div className="col-sm-9 col-7">
                                            <span>{profile_info.first_name}</span>
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-sm-3 col-5">
                                            <h5 className="f-w-500">
                                                Last Name <span className="pull-right">:</span>
                                            </h5>
                                        </div>
                                        <div className="col-sm-9 col-7">
                                            <span>{profile_info.last_name}</span>
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-sm-3 col-5">
                                            <h5 className="f-w-500">
                                                Company Name <span className="pull-right">:</span>
                                            </h5>
                                        </div>
                                        <div className="col-sm-9 col-7">
                                            <span>{profile_info.company_name}</span>
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-sm-3 col-5">
                                            <h5 className="f-w-500">
                                                Location <span className="pull-right">:</span>
                                            </h5>
                                        </div>
                                        <div className="col-sm-9 col-7">
                                            <span>{profile_info.country}</span>
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-sm-3 col-5">
                                            <h5 className="f-w-500">
                                                Zipcode{" "}
                                                <span className="pull-right">:</span>
                                            </h5>
                                        </div>
                                        <div className="col-sm-9 col-7">
                                                                <span>{profile_info.zipcode}
                                                                    {/*{profile && profile.experience < 10*/}
                                                                    {/*    ? `0${profile && profile.experience}`*/}
                                                                    {/*    : profile && profile.experience}{" "}*/}
                                                                    {/*  Year Experiences*/}
                                                                </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
        
                            <h4 className="text-primary mb-4">
                                Personal Information
                            </h4>
    
    
                        </div>
                    </div>
                </div>
        </ProtectedRoute>
    );
};

export default connect(null, {pageTitle})(Profile);
