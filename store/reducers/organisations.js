export const SET_STORES = 'SET_STORES'
const initialState={
    stores:[]
}

export default (state=initialState,action) => {
    switch (action.type) {
    case SET_STORES:
      return {
        stores: action.stores
        };
    }
    return state;
}