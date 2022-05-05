import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { accessTokenSelector } from "../redux/reducers/AuthReducer";

const PrivateRoute = () => {
    const location = useLocation()
    const accessToken = useSelector(accessTokenSelector)
    return (
            accessToken
                ? <Outlet/>
                : <Navigate to='/login' state={{from: location}} replace/>
        
    )
}
export default PrivateRoute