import type { Dispatch } from "react";
import { LoginForm, postLogin, postSignUp, SignUpForm } from "../../api/user";
import type { RootState } from "../store";
import { fetchSelfUserInfo } from "../../api/user";
import {
    AuthActions,
    loginFail,
    loginPending,
    loginSuccess,
} from "./authAction";
import { NavigateFunction } from "react-router";

export function restoreLoginThunk() {
    return async function (
        dispatch: Dispatch<AuthActions>,
        getState: () => RootState
    ) {
        try {
            if (getState().auth.isAuthenticated === null) {
                const authToken = window.localStorage.getItem("auth_token");
                if (!authToken) {
                    dispatch(loginFail("auth token is not found"));
                    return;
                }

                const user = await fetchSelfUserInfo(authToken);
                console.log(user);
                dispatch(loginSuccess());
            }
        } catch (err: any) {
            dispatch(loginFail(err.message));
        }
    };
}

export function loginThunk(loginForm: LoginForm, navigate: NavigateFunction) {
    return async function (dispatch: Dispatch<AuthActions>) {
        try {
            dispatch(loginPending());
            const data = await postLogin(loginForm);
            window.localStorage.setItem("auth_token", data.token);
            dispatch(loginSuccess(data.username, data.id, data.isAdmin));
            navigate("/");
        } catch (err: any) {
            dispatch(loginFail(err.message));
            return err.message;
        }
    };
}

export function signUpThunk(
    signUpForm: SignUpForm,
    navigate: NavigateFunction
) {
    return async function (dispatch: Dispatch<AuthActions>) {
        try {
            console.log("check thunk signupForm", signUpForm);
            const data = await postSignUp(signUpForm);
            console.log(data);
            navigate("/login");
        } catch (err: any) {
            dispatch(loginFail(err.message));
            return err.message;
        }
    };
}
