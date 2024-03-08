import { LOGIN_USER } from "../types";
import { UserState, UserAction } from './UserInterfaces';

const UserReducer = (state: UserState, action: UserAction): UserState => {
  const { payload, type } = action;

  switch (type) {
      case LOGIN_USER:
            return {
                ...state,
                user: payload,
            };
      default:
            return state;
  }
};

export default UserReducer;