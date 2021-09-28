import { IDatesData } from '@screens/BrowseSpaces/model/QueryData';

export interface ISpacesAvailabilityRequest {
  spaceIds: string[];
  dates: IDatesData;
}
