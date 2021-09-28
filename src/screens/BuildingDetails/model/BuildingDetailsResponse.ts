import { SpaceType } from '@models/domain/space/SpaceTypes';
import { SpaceCategory } from '@models/domain/space/SpaceCategories';
import { LengthUnit } from '@models/domain/LengthUnit';
import { Currency } from '@models/domain/Currency';
import { ILocationDto } from '@screens/NeedsDashboard/Account/model/Location';

export interface IBuildingDetailsResponse {
  buildingResult: IBuildingDetailsWithAvailability;
  reviewsResult: IBuildingReviewsResult;
}

export interface IBuildingDetailsWithAvailability {
  building: IBuildingForDisplaying;
  spaces: ISpaceWithAvailability[];
}

interface IGeneralBuildingDetails {
  id: string;
  avatar: string;
  buildingName: string;
  description: string;
  companyName: string;
  type: string;
  tags: string[];
}

export interface IBuildingForEditing extends IGeneralBuildingDetails {
  location: ILocationDto;
  images: IImageDto[];
}

export interface IImageDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  url: string;
  description: string;
  index: number;
  deleteLoading: boolean;
  setAsAvatarLoading: boolean;
  avatar: boolean;
}

export interface IBuildingForDisplaying extends IGeneralBuildingDetails {
  rating: string;
  reviews: number;
  favorite: boolean;
  location: IBriefLocationDto;
  ownerId: string;
  gallery: string[];
}

export interface IBriefLocationDto {
  lat: number;
  lon: number;
  address: string;
}

export interface ISpaceDto {
  id: string;
  alias: string;
  lengthUnit: LengthUnit;
  currency: Currency;
  height: number;
  length: number;
  width: number;
  pricePerDay: number;
  spaceType: SpaceType;
  spaceCategory: SpaceCategory;
}

export interface ISpaceWithAvailability extends ISpaceDto {
  amountAvailable: number;
  spaceIdsAvailable: string[];
}

export interface IBuildingReviewsResult {
  totalPages: number;
  totalResults: number;
  reviews: IBookingReviewDto[];
}

export interface IBookingReviewDto {
  text: string;
  author: string;
  timestamp: Date;
  rating: number;
}
