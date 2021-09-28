import { ISpaceWithNotesDto } from './SpaceWithNotesDto';

export interface IAvailableAndScheduledSpaces {
  availableSpaces: ISpaceWithNotesDto[];
  scheduledSpaces: ISpaceWithNotesDto[];
}
