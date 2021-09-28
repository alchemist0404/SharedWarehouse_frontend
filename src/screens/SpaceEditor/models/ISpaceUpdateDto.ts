import { ISpaceEdit } from '@screens/SpaceEditor/models/ISpaceEdit';

export interface ISpaceUpdateDto extends ISpaceEdit{
  id: string;
}
