import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { accessTokenSelector, userInfoSelector } from "../redux/reducers/AuthReducer";

const AdminRoute = () => {
    const location = useLocation()
    const accessToken = useSelector(accessTokenSelector)
    const user = useSelector(userInfoSelector)
    return (
            accessToken && user.role === 0
                ? <Outlet/>
                : <Navigate to='/login' state={{from: location}} replace/>
        
    )
}
export default AdminRoute