/* eslint-disable @typescript-eslint/camelcase */
import { toggleStompClientRoutine } from '@root/reducers/stompClient';
import { store } from '@root/store';
import SockJS from 'sockjs-client';
import Stomp from 'stomp-websocket';

export const stompClientRegister = () => {
  const stompClient = Stomp.over(new SockJS('/broker', 'sharedwarehouse.api'));
  stompClient.reconnect_delay = 1000;
  toggleStompClientRoutine.success(stompClient);
  stompClient.debug = f => f;

  stompClient.connect(
    {},
    () => {
      store.dispatch(toggleStompClientRoutine.success(stompClient));
    }
  );

  // Figure out hot to call backend with https https://github.com/sockjs/sockjs-client/issues/473
};
