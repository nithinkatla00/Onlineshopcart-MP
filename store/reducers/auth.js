import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AL } from '../actions/auth';
import {ADD_NAME} from '../actions/products';
const ADD_LOCATION = 'ADD_LOCATION';
const initialState = {
  isAdmin:false,
  email:'',
  token: null,
  userId: null,
  didTryAutoLogin: false,
  name:'',
  mobile:'',
  location:''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        email:action.email,
        token: action.token,
        userId: action.userId,
        didTryAutoLogin: true,
        isAdmin: action.isAdmin
      };
    case ADD_NAME:
      return{
        ...state,
        name:action.name,
        mobile:action.mobile
      };
    case ADD_LOCATION:
      return{
        ...state,
        location:action.location
      };
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true
      };
    case LOGOUT:
      return {
        ...initialState,
        didTryAutoLogin: true
      };
    // case SIGNUP:
    //   return {
    //     token: action.token,
    //     userId: action.userId
    //   };
    default:
      return state;
  }
};
