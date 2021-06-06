import Organisation from '../../models/organisation';

import {SET_STORES} from '../reducers/organisations';

export const fetchStores = () => {
    return async (dispatch, getState) => {
      // any async code you want!
      try {
        const response = await fetch(
          'https://majorproject-e69fe-default-rtdb.firebaseio.com/stores.json'
        );
  
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
  
        const resData = await response.json();
        const loadedStores = [];
        for (const key in resData) {
            loadedStores.push(
            new Organisation(
              key,
              resData[key].email,
              resData[key].id,
              resData[key].location,
              resData[key].mobile,
              resData[key].name
            )
          );
        }
        dispatch({
          type: SET_STORES,
          stores: loadedStores,
        });
      } catch (err) {
        // send to custom analytics server
        throw err;
      }
    };
  };
  
  
 