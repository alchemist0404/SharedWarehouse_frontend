import { ISpaceTemplateModificationRequest } from '@screens/SpaceEditor/components/SpaceTemplateEditingForm';

export interface ISpaceTemplateCreationRequest extends ISpaceTemplateModificationRequest {
  buildingId: string;
}
