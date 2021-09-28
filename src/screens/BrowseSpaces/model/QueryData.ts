import { PageSize } from '@screens/BrowseSpaces/model/PageSize';
import { BuildingType } from '@models/domain/BuildingType';
import { LengthUnit } from '@models/domain/LengthUnit';
import { LatLngLiteral } from 'leaflet';

export interface IQueryDimensionsData {
  height?: number;
  length?: number;
  width?: number;
  unit: string;
}

export interface IQueryData {
  text?: string;
  pendingText?: string;
  page?: number;
  size?: PageSize;
  includedBuildingTypes?: BuildingType[];
  dates?: IDatesData;
  proximity?: IProximityData;
  amount?: number;
  dimensions?: IQueryDimensionsData;
}

export interface IProximityData {
  location: ILocationWithTitleData;
  range: number;
}

export interface ILocationWithTitleData {
  literal: LatLngLiteral;
  title: string;
}

export interface IDatesData {
  startingDate: Date;
  endingDate?: Date;
}
