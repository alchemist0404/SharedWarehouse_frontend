import { ISpaceEdit } from '@screens/SpaceEditor/models/ISpaceEdit';

export interface ISpaceCreateDto extends ISpaceEdit{
  spaceTemplateId: string;
}
