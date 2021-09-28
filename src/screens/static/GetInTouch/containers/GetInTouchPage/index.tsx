import React from 'react';
import common from '@screens/static/common.module.scss';
import GetInTouchContent from '@screens/static/GetInTouch/components/PageContent';

const GetInTouchPage: React.FC = () => (
  <div className={`${common.vertical_space} content_wrapper`}>
    <GetInTouchContent />
  </div>
);

export default GetInTouchPage;
