import React, { useState } from 'react';
import common from '@screens/NeedsDashboard/styles/common.module.scss';
import BookingsTable from '@screens/HavesDashboard/DropOffAndPickUp/containers/BookingsTable';
import ConnectedBookingDetailsModal
  from '@screens/HavesDashboard/DropOffAndPickUp/containers/ConnectedBookingDetailsModal';
import { IBookingDetailsForSchedulingDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/BookingDetailsDto';
import { IBookingDetailsForSchedulingWithPerson } from '@screens/HavesDashboard/DropOffAndPickUp/model/BookingDetailsForSchedulingWithPerson';
import { Label } from 'semantic-ui-react';
import styles from './styles.module.scss';

export const DropOffAndPickUp: React.FC = () => {
  const [expandedBooking, setExpandedBooking] = useState<IBookingDetailsForSchedulingDto>();
  return (
    <>
      <div className={common.container}>
        <h1>Drop-Off/Pick-Up Scheduling</h1>
        <h2>Schedules of active bookings</h2>
        <BookingsTable
          tableProps={(bookings: IBookingDetailsForSchedulingWithPerson[]) => ({
            titles: ['', 'Building Name', 'Space Details', 'Qty', 'Person'],
            rows: bookings.map(b => ({
              id: b.booking.id,
              cells: [
                {
                  content: b.needsReview && <Label circular size="mini" color="orange" empty />,
                  props: { className: styles.narrow_cell }
                },
                { content: b.building.buildingName },
                {
                  content: b.templatesToAmounts.length > 1
                    ? `${b.templatesToAmounts.length} kinds of spaces`
                    : b.templatesToAmounts[0].spaceTemplate.alias
                },
                {
                  content: b.templatesToAmounts.map(t2a => t2a.spaceIds.length)
                    .reduce((prev, curr) => prev + curr).toString()
                },
                { content: `${b.booking.personBooked.firstName} ${b.booking.personBooked.lastName}` }
              ],
              rowProps: {
                onClick: () => setExpandedBooking(b),
                warning: b.needsReview
              }
            }))
          })}
        />
      </div>
      <ConnectedBookingDetailsModal expandedBooking={expandedBooking} setExpandedBooking={setExpandedBooking} />
    </>
  );
};

export default DropOffAndPickUp;
