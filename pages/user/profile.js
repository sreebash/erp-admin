import {Fragment, useEffect, useState} from "react";
import {connect, useSelector} from "react-redux";
import {moodChange, pageTitle} from "../../src/redux/action/utils";
import axios from "axios";
import {apiUrl} from "../../config/apiConfig";
import ProtectedRoute from "../ProtectedRoute";

import {Formik, useFormik} from "formik";
import {updateProfile} from "../../src/redux/action/auth";


const Profile = ({pageTitle, updateProfile}) => {
    
    const formik = useFormik({
        
        initialValues: {
            username: '',
            first_name: '',
            last_name: '',
            company_name: '',
            zipcode: '',
            country: '',
            
            
        }
    })
    
    console.log('Form values:', formik.values)
    
    const [userProfileInfo, setUserProfileInfo] = useState(null);
    
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
                        
                        <h4 className="text-primary mb-4">
                            Personal Information
                        </h4>
                        
                        
                        {userProfileInfo && userProfileInfo.length > 0 && userProfileInfo.map((profile_info, i) => (
                            <div key={i}>
                                <Formik
                                    initialValues={{
                                        username: profile_info.username ? profile_info.username : '',
                                        first_name: profile_info.first_name ? profile_info.first_name : '',
                                        last_name: profile_info.last_name ? profile_info.last_name : '',
                                        company_name: profile_info.company_name ? profile_info.company_name : '',
                                        location: profile_info.location ? profile_info.location : '',
                                        address: profile_info.address ? profile_info.address : '',
                                        zipcode: profile_info.zipcode ? profile_info.zipcode : '',
                                        street: profile_info.street ? profile_info.street : '',
                                        city: profile_info.city ? profile_info.city : '',
                                        country: profile_info.country ? profile_info.country : '',
                                    }}
                                    validate={values => {
                                        const errors = {};
                                        if (!values.username) {
                                            errors.username = "Username name is required";
                                        }
                                        if (!values.first_name) {
                                            errors.first_name = 'First Name is required';
                                        }
                                        if (!values.last_name) {
                                            errors.last_name = "Last Name is required";
                                        }
                                        if (!values.company_name) {
                                            errors.company_name = "Company Name is required";
                                        }
                                        if (!values.address) {
                                            errors.address = "Address is required"
                                        }
                                        if (!values.street) {
                                            errors.street = "Street is required"
                                        }
                                        
                                        if (!values.city) {
                                            errors.city = "City is required"
                                        }
                                        
                                        if (!values.zipcode) {
                                            errors.zipcode = "Zipcode is required"
                                        }
                                        
                                        if (!values.country) {
                                            errors.country = "Country is required"
                                        }
                                        
                                        
                                        return errors;
                                    }}
                                    onSubmit={(values, {setSubmitting}) => {
                                        console.log("onSubmit")
                                        updateProfile(values, id);
                                        
                                    }}>
                                    {({
                                          values,
                                          errors,
                                          touched,
                                          handleChange,
                                          handleBlur,
                                          handleSubmit,
                                          isSubmitting
                                      }) => (
                                        <form className="checkout-form" onSubmit={handleSubmit}>
                                            <div className="checkout-section">
                                                <div className="shipping-area">
                                                    <div className="user-dashboard-content">
                                                        <div className="form-group">
                                                            
                                                            <div className="row mb-2">
                                                                <div className="col-sm-3 col-5">
                                                                    <h5 className="f-w-500">
                                                                        <strong>Username </strong> <span
                                                                        className="pull-right">:</span>
                                                                    </h5>
                                                                </div>
                                                                <div className="col-sm-9 col-7">
                                                                    <input type="text" id='username' name='username'
                                                                           onChange={handleChange}
                                                                           value={values.username}
                                                                           className='form-control'/>
                                                                </div>
                                                                
                                                                {errors.username && touched.username &&
                                                                    <span className="error-message">
                        {errors.username}
                      </span>
                                                                }
                                                            </div>
                                                            
                                                            
                                                            <div className="row mb-2">
                                                                <div className="col-sm-3 col-5">
                                                                    <h5 className="f-w-500">
                                                                        First Name <span
                                                                        className="pull-right">:</span>
                                                                    </h5>
                                                                </div>
                                                                <div className="col-sm-9 col-7">
                                                                    <input type="text" id='first_name' name='first_name'
                                                                           onChange={handleChange}
                                                                           value={values.first_name}
                                                                           className='form-control'/>
                                                                </div>
                                                                
                                                                {errors.first_name && touched.first_name &&
                                                                    <span className="error-message">
                        {errors.first_name}
                      </span>
                                                                }
                                                            </div>
                                                            
                                                            
                                                            <div className="row mb-2">
                                                                <div className="col-sm-3 col-5">
                                                                    <h5 className="f-w-500">
                                                                        Last Name <span
                                                                        className="pull-right">:</span>
                                                                    </h5>
                                                                </div>
                                                                <div className="col-sm-9 col-7">
                                                                    <input type="text" id='last_name' name='last_name'
                                                                           onChange={handleChange}
                                                                           value={values.last_name}
                                                                           className='form-control'/>
                                                                </div>
                                                                
                                                                {errors.fullname && touched.fullname &&
                                                                    <span className="error-message">
                        {errors.last_name}
                      </span>
                                                                }
                                                            </div>
                                                            
                                                            
                                                            <div className="row mb-2">
                                                                <div className="col-sm-3 col-5">
                                                                    <h5 className="f-w-500">
                                                                        Company Name <span
                                                                        className="pull-right">:</span>
                                                                    </h5>
                                                                </div>
                                                                <div className="col-sm-9 col-7">
                                                                    <input type="text" id='company_name'
                                                                           name='company_name'
                                                                           onChange={handleChange}
                                                                           value={values.company_name}
                                                                           className='form-control'/>
                                                                </div>
                                                                
                                                                {errors.company_name && touched.company_name &&
                                                                    <span className="error-message">
                        {errors.company_name}
                      </span>
                                                                }
                                                            </div>
                                                            
                                                            
                                                            <div className="row mb-2">
                                                                <div className="col-sm-3 col-5">
                                                                    <h5 className="f-w-500">
                                                                        Address <span
                                                                        className="pull-right">:</span>
                                                                    </h5>
                                                                </div>
                                                                <div className="col-sm-9 col-7">
                                                                    <textarea type="text" id='address' name='address'
                                                                              onChange={handleChange}
                                                                              value={values.address}
                                                                              className='form-control'/>
                                                                </div>
                                                                
                                                                {errors.address && touched.address &&
                                                                    <span className="error-message">
                        {errors.address}
                      </span>
                                                                }
                                                            </div>
                                                            
                                                            <div className="row mb-2">
                                                                <div className="col-sm-3 col-5">
                                                                    <h5 className="f-w-500">
                                                                        Street <span
                                                                        className="pull-right">:</span>
                                                                    </h5>
                                                                </div>
                                                                <div className="col-sm-9 col-7">
                                                                    <input type="text" id='street' name='street'
                                                                           onChange={handleChange}
                                                                           value={values.street}
                                                                           className='form-control'/>
                                                                </div>
                                                                
                                                                {errors.street && touched.street &&
                                                                    <span className="error-message">
                        {errors.street}
                      </span>
                                                                }
                                                            </div>
                                                            <div className="row mb-2">
                                                                <div className="col-sm-3 col-5">
                                                                    <h5 className="f-w-500">
                                                                        City <span
                                                                        className="pull-right">:</span>
                                                                    </h5>
                                                                </div>
                                                                <div className="col-sm-9 col-7">
                                                                    <input type="text" id='city' name='city'
                                                                           onChange={handleChange}
                                                                           value={values.city}
                                                                           className='form-control'/>
                                                                </div>
                                                                
                                                                {errors.city && touched.city &&
                                                                    <span className="error-message">
                        {errors.city}
                      </span>
                                                                }
                                                            </div>
                                                            <div className="row mb-2">
                                                                <div className="col-sm-3 col-5">
                                                                    <h5 className="f-w-500">
                                                                        Zipcode <span
                                                                        className="pull-right">:</span>
                                                                    </h5>
                                                                </div>
                                                                <div className="col-sm-9 col-7">
                                                                    <input type="text" id='zipcode' name='zipcode'
                                                                           onChange={handleChange}
                                                                           value={values.zipcode}
                                                                           className='form-control'/>
                                                                </div>
                                                                
                                                                {errors.zipcode && touched.zipcode &&
                                                                    <span className="error-message">
                        {errors.zipcode}
                      </span>
                                                                }
                                                            </div>
                                                            
                                                            <div className="row mb-2">
                                                                <div className="col-sm-3 col-5">
                                                                    <h5 className="f-w-500">
                                                                        Country <span
                                                                        className="pull-right">:</span>
                                                                    </h5>
                                                                </div>
                                                                <div className="col-sm-9 col-7">
                                                                    <input type="text" id='loccountryation'
                                                                           name='country'
                                                                           onChange={handleChange}
                                                                           value={values.country}
                                                                           className='form-control'/>
                                                                </div>
                                                                
                                                                {errors.country && touched.country &&
                                                                    <span className="error-message">
                        {errors.country}
                      </span>
                                                                }
                                                            </div>
                                                        
                                                        
                                                        </div>
                                                    
                                                    
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                type="submit"
                                                className="btn btn-info btn-block"
                                                id="dz-signup-submit"
                                            >
                                                Update Profile
                                            </button>
                                        </form>
                                    
                                    )}
                                </Formik>
                                
                            
                            </div>
                        ))}
                    
                    
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default connect(null, {pageTitle, updateProfile})(Profile);
