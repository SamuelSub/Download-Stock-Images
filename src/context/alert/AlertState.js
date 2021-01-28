import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = props => {
  const initialState = null;

  const [state, displatch] = useReducer(AlertReducer, initialState);

  const setAlert = (msg, type) => {
    displatch({
      type: SET_ALERT,
      payload: { msg, type }
    });
    setTimeout(() => displatch( { type: REMOVE_ALERT } ), 2500);
  }


  return <AlertContext.Provider 
    value={ {
      alert: state,
      setAlert
    }}
  >
    {props.children}
  </AlertContext.Provider>
}

export default AlertState