import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Container, Divider, Grid, GridColumn, GridRow } from 'semantic-ui-react';
import common from '@screens/static/common.module.scss';
import { ENDPOINTS } from '@containers/Routing/endpoints';
import styles from '@screens/static/ListYourSpaces/containers/ListYourSpacesPage/styles.module.scss';

export interface IHowItWorksContentProps {
  title?: string;
}

const mockMainCheckList = [
  {
    key: 1,
    listTitle: 'Assess your capabilities',
    listDescription: 'Assess your desire and capabilities to share your spaces. Hosting a shared space requires some time and resources but will help you make full use of any idle spaces you may currently have.'
  },
  {
    key: 2,
    listTitle: 'Determine revenue goals',
    listDescription: 'Determine your revenue goals, and what your monthly rental rate per space will be, based on national, regional, and local market conditions.'
  },
  {
    key: 3,
    listTitle: 'Clean up',
    listDescription: 'Clean up your shared spaces so that they are presentable and make a firm commitment to keep those areas of your space clean, clutter free, and easily accessible.'
  },
  {
    key: 4,
    listTitle: 'Get photographing',
    listDescription: 'Take great pictures of both your building (interior and exterior) and your shared spaces, that you can post with your listing. Remember: A picture is worth 1,000 words.\n'
  },
  {
    key: 5,
    listTitle: 'Level up your security',
    listDescription: 'Invest in a decent video surveillance system if you don’t already have one. Have the video surveillance system tested and working before you list your space.\n'
      + '\n'
      + 'Consider adding extra security to your space (keyless entry, biometric ID, alarm system, etc.), for extra peace of mind for your space guests.'
  },
  {
    key: 6,
    listTitle: 'Review your offerings',
    listDescription: 'Make a list of the desirable features offered at your shared space and include them in your listing.  If you feel you have a valuable feature which is not available in our system, drop us a note to ask us to implement that feature.'
  },
  {
    key: 7,
    listTitle: 'Prep your staff',
    listDescription: 'Train your team members to always deal professionally with your space guests.  Good common courtesy is expected, and exceptional service will lead to rave reviews, repeat customers, and referrals to your listings.'
  }
];

const mockSubCheckList = [
  {
    key: 1,
    listTitle: 'Scope out your warehouse manager’s availability',
    listDescription: 'Make sure that your warehouse manager has the time to handle additional warehouse tasks related to sharing your warehouse space.'
  },
  {
    key: 2,
    listTitle: 'Set aside your space',
    listDescription: 'Clear out an area of your warehouse to set aside as your “shared space”.'
  },
  {
    key: 3,
    listTitle: 'Quantify your space to list',
    listDescription: 'Determine the number of rentable spaces you will have available to offer.'
  }
];

const ListYourSpacesContent: React.FC<IHowItWorksContentProps> = ({ title = 'Before you list your spaces...' }) => (
  <div className={common.container}>
    <div className={styles.centered}>
      <h1>{title}</h1>
      <h2>Please carefully review this checklist, to make sure that you are ready to host:</h2>
    </div>
    <Container className={styles.text} text>
      <Grid>
        <GridRow columns={2}>
          <GridColumn width={2} />
          <GridColumn width={14}>
            <h3 className={styles.requirementsTitle}>Host Requirements</h3>
            <p className={styles.downloadLink}>Download as PDF</p>
          </GridColumn>
        </GridRow>
        {
          mockMainCheckList.map(item => (
            <GridRow columns={2} key={item.key}>
              <GridColumn textAlign="right" width={2}>
                <Checkbox className={styles.colorCheckbox} />
              </GridColumn>
              <GridColumn width={14}>
                <h4 className={styles.listTitle}>
                  {item.listTitle}
                </h4>
                <p className={styles.listDescription}>
                  {item.listDescription}
                </p>
                <Divider />
              </GridColumn>
            </GridRow>
          ))
        }
        <GridRow>
          <GridColumn width={2} />
          <GridColumn width={14}>
            <p className={styles.requirementsWarehouse}>
              The following requirements only apply to hosts providing warehouse space on Shared Spaces—
            </p>
            <Divider />
          </GridColumn>
        </GridRow>
        {
          mockSubCheckList.map(item => (
            <GridRow columns={2} key={item.key}>
              <GridColumn textAlign="right" width={2}>
                <Checkbox className={styles.colorCheckbox} />
              </GridColumn>
              <GridColumn width={14}>
                <h4 className={styles.listTitle}>
                  {item.listTitle}
                </h4>
                <p className={styles.listDescription}>
                  {item.listDescription}
                </p>
                <Divider />
              </GridColumn>
            </GridRow>
          ))
        }
        <GridRow>
          <GridColumn width={2} />
          <GridColumn width={14}>
            <p className={styles.requirementsWarehouse}>
              Once you complete all of these items, you’re ready to go and list your space on Shared Spaces
            </p>
            <Divider />
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn width={2} />
          <GridColumn width={14} textAlign="center">
            <Button color="olive"><Link to={ENDPOINTS.USER} style={{ color: 'white' }}>GO!</Link></Button>
          </GridColumn>
        </GridRow>
      </Grid>
    </Container>
  </div>
);

export default ListYourSpacesContent;
