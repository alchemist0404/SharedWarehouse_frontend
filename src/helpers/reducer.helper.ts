import { Routine } from 'redux-saga-routines';
import { IRequestState } from 'models/IRequestState';

const extractAllActionDomains = (actionTypes: string[]): string[] => actionTypes.map(type => type.split('/').shift());
const extractActionType = (actionType: string): string => actionType.split('/').pop();
const extractActionDomain = (actionType: string): string => actionType.split('/').shift();

const initialRequestState: IRequestState = {
  loading: false,
  error: null
};

export const reducerCreator = (actionTypesFromDomains: string[]) => (
  state = initialRequestState,
  action: Routine<any>
): IRequestState => {
  const actionDomains = extractAllActionDomains(actionTypesFromDomains);
  if (!actionDomains.includes(extractActionDomain(action.type))) {
    return state;
  }
  const type = extractActionType(action.type);

  switch (type) {
    case 'TRIGGER':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'FULFILL':
    case 'SUCCESS':
      return {
        ...state,
        loading: false,
        error: null
      };
    case 'FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
