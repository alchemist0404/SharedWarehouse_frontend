import React, { useEffect } from 'react';
import styles from '@screens/UserMain/containers/UserMainPage/styles.module.scss';
import { Label, Loader, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IBriefBookingDto } from '@screens/UserMain/model/Booking';
import { IBindingAction } from '@models/Callbacks';
import { BookingStatus } from '@models/domain/BookingStatus';

export interface IBookingsTabProps {
  bookings: IBriefBookingDto[];
  error: string | undefined;
  loading: boolean;
  load: IBindingAction;
}

const BookingsTab: React.FC<IBookingsTabProps> = (
  { bookings, error, loading, load }
) => {
  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className={styles.container}>
      <Loader active={loading} />
      {error && (
        <Label color="red" content={error} basic />
      )}
      {!loading && (
        <Table celled sortable>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>ID</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>From</TableHeaderCell>
              <TableHeaderCell>To</TableHeaderCell>
              <TableHeaderCell>Cost (per day)</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map(b => (
              <TableRow key={b.id}>
                <TableCell><Link to={`/booking/${b.id}`}>{b.id}</Link></TableCell>
                <TableCell>
                  {b.status === BookingStatus.PENDING && <Label color="yellow" content="Pending" />}
                  {b.status === BookingStatus.CONFIRMED && <Label color="green" content="Confirmed" />}
                  {b.status === BookingStatus.CANCELLED && <Label color="red" content="Cancelled" />}
                </TableCell>
                <TableCell>{b.startingDate}</TableCell>
                <TableCell>{b.endingDate}</TableCell>
                <TableCell>{`${b.costPerDay?.amount} ${b.costPerDay?.currency}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default BookingsTab;
