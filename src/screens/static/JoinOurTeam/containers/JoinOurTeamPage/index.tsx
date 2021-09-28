import React from 'react';
import common from '@screens/static/common.module.scss';
import JoinOurTeamContent from '@screens/static/JoinOurTeam/components/PageContent';

const JoinOurTeamPage: React.FC = () => (
  <div className={`${common.vertical_space} content_wrapper`}>
    <JoinOurTeamContent />
  </div>
);

export default JoinOurTeamPage;
