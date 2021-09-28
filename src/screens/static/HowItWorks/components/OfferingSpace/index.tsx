import React from 'react';
import styles from '@screens/static/HowItWorks/containers/HowItWorksPage/styles.module.scss';
import { Link } from 'react-router-dom';

const OfferingSpace: React.FC = () => (
  <>
    <p>
      Shared Spaces provides you with a platform with all the tools you’ll need to list your
      available spaces, manage your rented spaces, bill for the rentals, and schedule drop-offs
      and pick-ups of items to be stored in or withdrawn from your warehouse (as applicable).
    </p>
    <h3 className={styles.space_above}>Eligibility</h3>
    <p>
      In order for your space to be eligible for rental, it has to meet certain requirements
      listed here, which have been created to protect both you and your potential rental guests.
    </p>
    <p>
      View the full checklist of landlord requirements&nbsp;
      <Link to="/">here.</Link>
    </p>
    <h3 className={styles.space_above}>Managing the space</h3>
    <p>
      Once someone selects your space for rental, our system will notify you so that you can
      ready your space and get in touch with your rental guest to schedule any drop-off or
      pick-up service (as necessary).
    </p>
    <p>
      <b>FOR WAREHOUSE SPACES:&nbsp;</b>
      After the goods have arrived at your space, it is your responsibility
      to fulfill your contract—which, in short, means that you are in charge of putting away the
      goods and protecting them from damage and theft while in your possession. You can read all
      of the details in our&nbsp;
      <Link to="/terms_and_conditions">TERMS and CONDITIONS</Link>
    </p>
    <p>
      Your tenant will be invited to rate the service you provide them, so please make sure you are
      doing the best you can to meet their needs—not only because it is the right thing to do, but
      because your reviews will follow you and be seen by potential future clients looking to rent
      spaces from you.
    </p>
    <h3 className={styles.space_above}>Payment details</h3>
    <p>
      At the end of each month, we will calculate the rental fees due from each of your customers, collect payments,
      and transfer directly to your bank account (NET of our transactional fees.)
    </p>
  </>
);

export default OfferingSpace;
