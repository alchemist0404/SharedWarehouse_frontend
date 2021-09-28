import { IResultBuildingItem } from '@screens/BrowseSpaces/model/ResultItem';
import { LocationDescriptor } from 'history';
import { IPassedState } from '@screens/BuildingDetails/containers/BuildingDetailsPage';
import * as queryString from 'querystring';

export const searchBrowserBuildingLink = (item: IResultBuildingItem): LocationDescriptor => ({
  pathname: `/details/${item.id}`,
  state: { buildingName: item.name } as IPassedState
});

export const dashboardBuildingLink = (item: IResultBuildingItem, prevLocation): LocationDescriptor => {
  const prevQuery = queryString.parse(prevLocation.search);
  return ({
    ...prevLocation,
    search: queryString.stringify({ ...prevQuery, building: item.id }),
    state: { buildingName: item.name } as IPassedState
  });
};
