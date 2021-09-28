import React, { useState } from 'react';
import common from '@screens/NeedsDashboard/styles/common.module.scss';
import { IBookingDetailsForSchedulingDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/BookingDetailsDto';
import BookingsTable from '@screens/NeedsDashboard/DropOffAndPickUp/containers/BookingsTable';
import ConnectedBookingDetailsModal
  from '@screens/NeedsDashboard/DropOffAndPickUp/containers/ConnectedBookingDetailsModal';
import { Label } from 'semantic-ui-react';
import { colorOfStatus } from '@models/domain/BookingStatus';
import { ENDPOINTS } from '@containers/Routing/endpoints';
import { Link } from 'react-router-dom';
import { setExpandedBookingRoutine } from '@screens/NeedsDashboard/DropOffAndPickUp/routines';
import { extractExpandedBooking } from '@screens/NeedsDashboard/DropOffAndPickUp/reducers';
import { connect } from 'react-redux';
import { IBindingCallback1 } from '@models/Callbacks';

interface IState {
  expandedBooking?: IBookingDetailsForSchedulingDto;
}

interface IActions {
  setExpandedBooking: IBindingCallback1<IBookingDetailsForSchedulingDto | undefined>;
}

interface IProps extends IState, IActions {
}

const DropOffAndPickUp: React.FC<IProps> = ({ expandedBooking, setExpandedBooking }) => (
  <>
    <div className={common.container}>
      <h1>Bookings and Scheduling</h1>
      <h2>My current spaces</h2>
      <BookingsTable
        tableProps={bookings => ({
          titles: ['Building Name', 'Status', 'Space Details', 'Qty', 'Address'],
          rows: bookings.map(b => ({
            id: b.booking.id,
            cells: [
              { content: <Link to={ENDPOINTS.BOOKING(b.booking.id)}>{b.building.buildingName}</Link> },
              { content: <Label color={colorOfStatus(b.booking.status)} content={b.booking.status} /> },
              {
                content: b.templatesToAmounts.length > 1
                  ? `${b.templatesToAmounts.length} kinds of spaces`
                  : b.templatesToAmounts[0].spaceTemplate.alias
              },
              {
                content: b.templatesToAmounts.map(t2a => t2a.spaceIds.length)
                  .reduce((prev, curr) => prev + curr).toString()
              },
              { content: b.building.location?.address || 'Unknown' }
            ],
            rowProps: {
              onClick: () => setExpandedBooking(b)
            }
          }))
        })}
      />
    </div>
    <ConnectedBookingDetailsModal setExpandedBooking={setExpandedBooking} expandedBooking={expandedBooking} />
  </>
);

const mapStateToProps = state => ({
  expandedBooking: extractExpandedBooking(state)
});

const mapDispatchToProps = {
  setExpandedBooking: setExpandedBookingRoutine.fulfill
};

export default connect(mapStateToProps, mapDispatchToProps)(DropOffAndPickUp);
