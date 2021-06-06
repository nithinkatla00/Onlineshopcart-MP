import AsyncStorage from '@react-native-async-storage/async-storage';

// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';


let timer;

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const authenticate = (email,userId, token, expiryTime,isAdmin=false) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, email:email,userId: userId, token: token,isAdmin });
  };
};

export const checkuser = async (id) => {
  const response = await fetch(`https://majorproject-e69fe-default-rtdb.firebaseio.com/users/${id}.json`);
  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  const resData = await response.json();
  if(resData!==null){
    return true
  }else{
    return false
  }
}


const checkAdmin = async (id) => {
  const response = await fetch(`https://majorproject-e69fe-default-rtdb.firebaseio.com/stores.json`);
  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  const resData = await response.json();
  for(const key in resData){
    if(resData[key].id===id){
      return true
    }
  }
  return false
}

export const signup = (email, password,name,mobile) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCMMVv9baQzAD-BhDjfvuWjgmmUv9M9ERI',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    ); 
    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    dispatch(
      authenticate(
        resData.email,
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000,
        false
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);

    const response2 = await fetch(
      `https://majorproject-e69fe-default-rtdb.firebaseio.com/users/${resData.localId}.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          name,
          mobile
        })
      }
    );
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCMMVv9baQzAD-BhDjfvuWjgmmUv9M9ERI',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found!';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'This password is not valid!';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    const a=await checkuser(resData.localId);
    if(a){
    dispatch(
      authenticate(
        resData.email,
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000,
        false
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    }else{
      throw new Error('Not valid user');
    }
  };
};

export const Adminsignup = (email, password,name,mobile,location) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCMMVv9baQzAD-BhDjfvuWjgmmUv9M9ERI',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    ); 
    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists for organisation already!';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    dispatch(
      authenticate(
        resData.email,
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000,
        true
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);

    const response2 = await fetch(
      'https://majorproject-e69fe-default-rtdb.firebaseio.com/stores.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id:resData.localId,
          email,
          name,
          mobile,
          location
        })
      }
    );
  };
};

export const Adminlogin = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCMMVv9baQzAD-BhDjfvuWjgmmUv9M9ERI',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found!';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'This password is not valid!';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    const a= await checkAdmin(resData.localId);
    if(a){
    dispatch(
      authenticate(
        resData.email,
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000,
        true
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    }else{
      throw new Error('Not valid store credentials');
    }
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString()
    })
  );
};
