import { createRoutine, Routine } from 'redux-saga-routines';

export const toggleStompClientRoutine = createRoutine('TOGGLE_STOMP_CLIENT');

const stompClient = (state = {}, action: Routine<any>) => {
  const { type, payload } = action;
  switch (type) {
    case toggleStompClientRoutine.SUCCESS:
      return payload;
    default:
      return state;
  }
};

export default stompClient;
