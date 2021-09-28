import { IBuildingForEditing } from '@screens/BuildingDetails/model/BuildingDetailsResponse';
import { ISpaceTemplateDto } from '@screens/BookingCheckout/model/PaymentRequirementResponse';

export interface IBuildingDetailsWithSpaces {
  building: IBuildingForEditing;
  spaceTemplates: ISpaceTemplateDto[];
}
