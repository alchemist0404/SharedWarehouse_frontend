import React from 'react';
import frontImage from '@images/Idle_Spaces_Main.jpg';
import s from '@screens/Landing/containers/LandingPage/styles.module.scss';
import classNames from 'classnames';
import SearchBar from '@screens/Landing/containers/SearchBar';

const FrontBlock: React.FC = () => (
  <div style={{ backgroundImage: `url(${frontImage})` }} className={s.first_block}>
    <div className={classNames('content_wrapper', s.vertical_spaces, s.centered, s.full_size)}>
      <SearchBar className={s.search_bar} />
      <div className={s.slogan_container}>
        <h1 className={s.slogan}>
          Putting
          <br />
          Idle Spaces
          <br />
          to Work
        </h1>
      </div>
    </div>
  </div>
);

export default FrontBlock;
