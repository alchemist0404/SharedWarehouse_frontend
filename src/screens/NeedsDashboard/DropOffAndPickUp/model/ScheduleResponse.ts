import { IBaseAuditable } from '@models/domain/BaseAuditable';
import { ScheduleType } from '@models/domain/schedule/ScheduleType';
import { ScheduleStatus } from '@models/domain/schedule/ScheduleStatus';
import { IScheduleSpaceNoteDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/ScheduleSpaceNoteDto';

export interface IScheduleResponseDto extends IBaseAuditable {
  id: string;
  scheduledTime: string;
  type: ScheduleType;
  status?: ScheduleStatus;
  bookingId: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  notes?: string;
  spaces?: IScheduleSpaceNoteDto[];
}
