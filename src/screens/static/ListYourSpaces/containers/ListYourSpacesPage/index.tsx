import React from 'react';
import common from '@screens/static/common.module.scss';
import ListYourSpacesContent from '@screens/static/ListYourSpaces/components/PageContent';
import { useSelector } from 'react-redux';
import { extractUserRoles } from '@screens/Authorization/reducers';
import { Role } from '@screens/Authorization/models/Roles';
import { Redirect } from 'react-router-dom';
import { ENDPOINTS } from '@containers/Routing/endpoints';

const ListYourSpacesPage: React.FC = () => {
  const role = useSelector(extractUserRoles)[0];
  return (
    role === Role.NEED
      ? <Redirect to={ENDPOINTS.USER} />
      : (
        <div className={`${common.vertical_space} content_wrapper`}>
          <ListYourSpacesContent />
        </div>
      )
  );
};

export default ListYourSpacesPage;
