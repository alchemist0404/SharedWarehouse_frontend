import { RootState } from '@root/store';

const SET_FOOTER_COLOR = 'APP_ROUTER:SET_FOOTER_COLOR';

export const setFooterOrange = (payload: boolean) => ({ type: SET_FOOTER_COLOR, payload });

const routerReducer = (state = { footerOrange: false }, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_FOOTER_COLOR:
      return {
        ...state,
        footerOrange: payload
      };
    default:
      return state;
  }
};

export const extractIsFooterOrange = (state: RootState) => state.routerReducer.footerOrange;

export default routerReducer;
