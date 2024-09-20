import * as types from './actionType';
export const handleLoader = value => dispatch => dispatch({ type: 'GET_LOADER', value })
// -------admin---------//
export const sidebarHandler = value => dispatch => dispatch({ type: 'SIDEBAR_FLAG', value })
