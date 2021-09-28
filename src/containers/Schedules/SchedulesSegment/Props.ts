import { IRequestDetails } from '@models/RequestDetails';
import { IBindingCallback1 } from '@models/Callbacks';
import { IScheduleResponseDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/ScheduleResponse';

export interface ICommonSchedulesSegmentProps {
  schedulesRequestDetails: IRequestDetails<IScheduleResponseDto>;
  bookingId: string;
  expandedScheduleData: IScheduleResponseDto;
  setExpandedScheduleData: IBindingCallback1<IScheduleResponseDto>;
}
