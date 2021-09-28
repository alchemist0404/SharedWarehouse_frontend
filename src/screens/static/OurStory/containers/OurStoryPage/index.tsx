import React from 'react';
import styles from './styles.module.scss';
import common from '../../../common.module.scss';
import ourStoryImage from '@images/Our_Story_Page_Image.jpg';
import { Container, Image } from 'semantic-ui-react';

const OurStoryPage: React.FC = () => (
  <div className={`${common.container} content_wrapper ${styles.container} ${common.vertical_space}`}>
    <div className={styles.centered}>
      <h1>We are small business-owners</h1>
      <h2>
        We get where you come from and where you want to go.
        We feel you and want to empower you in achieving your business goals from day one.
      </h2>
    </div>
    <Container className={styles.text}>
      <p>
        <Image floated="left" className={styles.image} src={ourStoryImage} alt="Alex" />
        I’m Alex Canizales, the founder of Shared Warehouse. For the last few decades, I have been a successful
        small-business owner. However, I always found myself with extra warehouse space that I didn’t need or
        want to pay for. In my interactions with other entrepreneurs, I found that this was a problem that
        a lot of people have.
      </p>
      <p>
        I started thinking about how to solve this problem, and came up with the idea to divide warehouse space up
        between several different small businesses, to maximize the space and to save people from spending too
        much on space they didn’t need.
      </p>
      <p>
        In 2020, Shared Warehouse was born to facilitate the connection between those who have excess warehouse
        space and those who need to rent a small portion of warehouse space—the “haves” and the “needs.”
        Shared Warehouse is here not only to connect people and their needs, but also to make your life easier
        by managing the warehouse space so that you don’t have to.
      </p>
    </Container>
  </div>
);

export default OurStoryPage;
