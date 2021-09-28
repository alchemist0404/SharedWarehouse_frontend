import React, { useCallback, useState, useEffect } from 'react';
import { ICommonSchedulesSegmentProps } from '@containers/Schedules/SchedulesSegment/Props';
import { IBindingCallback1 } from '@models/Callbacks';
import { IScheduleReviewRequest } from '@screens/HavesDashboard/DropOffAndPickUp/model/ScheduleReviewRequest';
import { Button, Header } from 'semantic-ui-react';
import ListView from '@components/ListView';
import ScheduleRow from '@containers/Schedules/SchedulesSegment/ScheduleRow';
import ReviewScheduleModal
  from '@root/screens/HavesDashboard/DropOffAndPickUp/containers/SchedulesSegment/ReviewScheduleModal';
import { ScheduleStatus } from '@models/domain/schedule/ScheduleStatus';
import styles from './styles.module.scss';
import HandleScheduleSpacesModal from './HandleScheduleSpacesModal';
import { IScheduleResponseDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/ScheduleResponse';
import HandleCompleteScheduleModal
  from '@screens/HavesDashboard/DropOffAndPickUp/containers/SchedulesSegment/HandleCompleteScheduleModal';

export interface IReviewingSchedulesSegmentProps extends ICommonSchedulesSegmentProps {
  reviewSchedule: IBindingCallback1<IScheduleReviewRequest>;
  completeSchedule: IBindingCallback1<IScheduleResponseDto>;
  decisionLoading: boolean;
  completeLoading: boolean;
}

const ReviewingSchedulesSegment: React.FC<IReviewingSchedulesSegmentProps> = (
  { expandedScheduleData, bookingId, schedulesRequestDetails, decisionLoading, reviewSchedule,
    completeSchedule, setExpandedScheduleData, completeLoading }
) => {
  const { loading: schedulesLoading, items: schedules } = schedulesRequestDetails;
  const [revievedScheduleId, setRevievedScheduleId] = useState('');
  const [showSpaceMapping, setShowSpaceMapping] = useState<boolean>(false);
  const [pendingCompleteSchedule, setPendingCompleteSchedule] = useState<IScheduleResponseDto | undefined>(undefined);

  useEffect(() => {
    setRevievedScheduleId(expandedScheduleData?.id);
    setShowSpaceMapping(expandedScheduleData?.status === ScheduleStatus.ACCEPTED);
  }, [expandedScheduleData]);

  const handleScheduleReview = useCallback((approved: boolean) => {
    reviewSchedule({ approved, bookingId, scheduleId: expandedScheduleData?.id });
  }, [bookingId, expandedScheduleData, reviewSchedule]);

  const handleScheduleComplete = useCallback((sch: IScheduleResponseDto) => {
    if (new Date(sch.scheduledTime) <= new Date()) {
      completeSchedule(sch);
    } else {
      setPendingCompleteSchedule(sch);
    }
  }, [completeSchedule, setPendingCompleteSchedule]);

  return (
    <>
      <Header>Existing drop-offs / pick-ups</Header>
      <ListView
        loading={schedulesLoading}
        items={schedules}
        renderItem={sch => <ScheduleRow schedule={sch} />}
        itemToClassName={sch => (sch.status === ScheduleStatus.PENDING ? styles.not_reviewed : '')}
        onItemClick={setExpandedScheduleData}
        placeholderText="No schedules planned"
        renderItemFooter={sch => sch.status === ScheduleStatus.ACCEPTED && (
          <div className={styles.footerWrapper}>
            <Button
              color="orange"
              onClick={() => handleScheduleComplete(sch)}
              content="Mark as Completed"
              className={styles.footerButton}
              loading={completeLoading}
            />
          </div>
        )}
        itemDisabled={sch => sch.status !== ScheduleStatus.PENDING && sch.status !== ScheduleStatus.ACCEPTED}
      />
      {showSpaceMapping
        ? (
          <HandleScheduleSpacesModal
            scheduleId={revievedScheduleId}
            setExpandedScheduleData={setExpandedScheduleData}
          />
        )
        : (
          <ReviewScheduleModal
            expandedScheduleData={expandedScheduleData}
            reviewSchedule={handleScheduleReview}
            reviewLoading={decisionLoading}
            setExpandedScheduleData={setExpandedScheduleData}
          />
        )}
      <HandleCompleteScheduleModal
        setSchedule={setPendingCompleteSchedule}
        completeSchedule={completeSchedule}
        schedule={pendingCompleteSchedule}
      />
    </>
  );
};

export default ReviewingSchedulesSegment;
