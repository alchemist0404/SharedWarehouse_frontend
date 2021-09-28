import React from 'react';
import s from '@screens/BookingCheckout/containers/BookingCheckoutPage/BookingDetailsCheckoutStep/styles.module.scss';
import { Form, FormTextArea } from 'semantic-ui-react';

export interface IOtherNeedsNotesProps {
  notesText: string;
  setNotesText: (text: string) => void;
}

const OtherNeedsNotes: React.FC<IOtherNeedsNotesProps> = ({ notesText, setNotesText }) => (
  <>
    <h4 className={s.details__other_needs_label}>Other needs</h4>
    <h5 className={s.details__other_needs_tip}>Any other accommodations? Let us know.</h5>
    <Form>
      <FormTextArea
        placeholder="Other comments"
        disabled={false}
        onChange={(ev, { value }) => setNotesText(value as string)}
        value={notesText}
      />
    </Form>
  </>
);

export default OtherNeedsNotes;
