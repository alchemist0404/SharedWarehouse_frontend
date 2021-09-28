import { IBuildingForDisplaying } from '@screens/BuildingDetails/model/BuildingDetailsResponse';

export interface ILoadableBuildingComponent {
  loading: boolean;
  building: IBuildingForDisplaying;
}
