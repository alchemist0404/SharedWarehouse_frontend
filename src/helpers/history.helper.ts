import { createBrowserHistory } from 'history';
import { parse, stringify } from 'query-string';

export const history = createBrowserHistory();

export const patchUrlQuery = (query: IQuery) => {
  const currentLocation = history.location;
  const parsedSearch = parse(currentLocation.search);

  history.replace({
    ...currentLocation,
    search: stringify({
      ...parsedSearch,
      ...query
    })
  });
};

interface IQuery {
  [key: string]: string;
}
