import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { RootState, RootThunkDispatch } from '../../redux/store'
import jwt_decode from 'jwt-decode'
import { loginSuccess } from '../../redux/auth/authAction'

type tokenType = {
    username: string
    id: number
}

function RequireAuth() {
    const dispatch = useDispatch<RootThunkDispatch>()
    console.log('pass auth')
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    )
    const location = useLocation()

    // if (isAuthenticated === null) {
    //     return null
    // }
    if (!isAuthenticated) {
        // try to get local storage
        const token = window.localStorage.getItem('auth_token')
        console.log('check if can get auth token', token)
        if (token) {
            // pull token decode info into redux
            let decoded: tokenType
            decoded = jwt_decode(token)
            console.log('check decoded', decoded)
            dispatch(loginSuccess(decoded.username, decoded.id))
            return <Outlet />
        } else
            return <Navigate to="/login" state={{ from: location }} replace />
    }

    return <Outlet />
}

export default RequireAuth
