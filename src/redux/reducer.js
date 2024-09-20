import { SIDEBAR_FLAG, GET_LOADER } from './actionType';

const initialState = {
    loader: false,
    open: true,

};

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case SIDEBAR_FLAG:
            return {
                ...state,
                open: action.value,
            };
        case GET_LOADER:
            return {
                ...state,
                loader: action.value,
            };
  
        default:
            return state;
    }
};

export default usersReducer;