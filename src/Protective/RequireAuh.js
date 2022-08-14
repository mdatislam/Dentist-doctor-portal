import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../firebase.init';
import { Navigate,useLocation,useNavigate } from "react-router-dom";
import Loading from '../SharedPage/Loading';

const RequireAuh = ({children}) => {
    const [user, loading] = useAuthState(auth);
    const location = useLocation()

    if(loading) return <Loading/>

    if(!user){
        return <Navigate to="/Login" state={{from:location}} replace></Navigate>
    }
    return children
};

export default RequireAuh;