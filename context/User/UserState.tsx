import React, { useReducer, Dispatch, useEffect } from "react";
import axios, {AxiosError} from 'axios';
import Router from "next/router";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import { UserState, UserAction, AuthPayload } from './UserInterfaces';

import { LOGIN_USER } from "../types";

interface Props {
  children: React.ReactNode;
}

const UserState: React.FC<Props> = (props) => {
  const initialState: UserState = {
    user: null,
  };
  const [state, dispatch] = useReducer(UserReducer, initialState) as [UserState, Dispatch<UserAction>];


  const csrfRequest = async () => {
    axios.defaults.withCredentials = true;
    axios.defaults.withXSRFToken = true;
    const csrf  = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sanctum/csrf-cookie`);
    return true;
  }

  const registerUser = async (body: AuthPayload): Promise<void | any> => { 
    try {
      await csrfRequest();
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/register`, body);
      const getUser = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user`);
      dispatch({ type: LOGIN_USER, payload: getUser.data });
      Router.push("/");
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 422) {
        console.error("422 Error fetching user data:", axiosError.response.data);
        return axiosError.response.data; 
      } else {
        console.error("Error fetching user data:", error);
      }
    }
  };

  const loginUser = async (body: AuthPayload): Promise<void | any> => { 
    try {
      await csrfRequest();
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, body);
      const getUser = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user`);
      dispatch({ type: LOGIN_USER, payload: getUser.data });
      Router.push("/");
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 422) {
        console.error("422 Error fetching user data:", axiosError.response.data);
        return axiosError.response.data; 
      } else {
        console.error("Error fetching user data:", error);
      }
    }
  };

  const getUser = async () => {
    try {
      await csrfRequest();
      const getUser = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user`);
      dispatch({ type: LOGIN_USER, payload: getUser.data });
      /* Router.push("/"); */
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error fetching user data:", axiosError);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const logoutUser = async () => {
    try {
      await csrfRequest();
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`);
      state.user = null;
      dispatch({ type: LOGIN_USER, payload: state.user });
      Router.push("/");
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        loginUser,
        logoutUser,
        registerUser,
        getUser
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;