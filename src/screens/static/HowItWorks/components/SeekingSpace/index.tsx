import React from 'react';
import { Link } from 'react-router-dom';
import styles from '@screens/static/HowItWorks/containers/HowItWorksPage/styles.module.scss';

const SeekingSpace: React.FC = () => (
  <>
    <p>
      You can search available space near by using our search bar, above. We’ve added filters to make it
      easier for you to find the perfect space.
    </p>
    <p>
      Once you’ve found the right space and are ready to book your space, simply check out and
      you will receive a confirmation email immediately, followed by an email from your space
      host within 24 hours of booking to let you know that your space is ready, and to share
      with you any necessary information unique to your space and how to drop off your goods.
      Depending on your area, you may have the option to schedule a pickup of your goods.
    </p>
    <h3 className={styles.space_above}>Billing details</h3>
    <p>
      Billing occurs on the first of every month, and continues on a month-to-month basis
      until you terminate your contract. If your contract starts or ends after the 1st of
      the month, your fee for that month will be pro-rated accordingly.
    </p>
    <p>
      You can increase or decrease your storage needs on a monthly basis as necessary,
      and you can cancel at anytime free-of-charge.
    </p>
    <p>
      You can read all of the details in our&nbsp;
      <Link to="/terms_and_conditions">TERMS and CONDITIONS</Link>
    </p>
  </>
);

export default SeekingSpace;
