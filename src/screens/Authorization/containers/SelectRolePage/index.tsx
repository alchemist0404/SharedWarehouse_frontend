import { IBindingCallback1 } from '@root/models/Callbacks';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Message } from 'semantic-ui-react';
import { Role } from '../../models/Roles';
import { extractRoleSelectionError, extractRoleSelectionLoading } from '../../reducers';
import { selectRolesRoutine } from '../../routines';
import styles from './styles.module.scss';
import { useHistory } from 'react-router-dom';

export interface ISelectRolePageProps {
  selectRoles: IBindingCallback1<Role[]>;
  errorMessage: string;
  loading: boolean;
}

const SelectRolePage: React.FC<ISelectRolePageProps> = ({ selectRoles, loading, errorMessage }) => {
  const history = useHistory();
  const handleHaveClick = () => {
    selectRoles([Role.HAVE]);
    // history.push('/list_our-spaces');
  };
  return (
    <div className={`${styles.container} ${styles.layout}`}>
      <h2>Please, select your account type</h2>
      <Button content="Become a Have" color="olive" onClick={handleHaveClick} loading={loading} />
      <Button content="Become a Need" color="olive" onClick={() => selectRoles([Role.NEED])} loading={loading} />
      {errorMessage && <Message error>{errorMessage}</Message>}
    </div>
  );
};

const mapStateToProps = state => ({
  loading: extractRoleSelectionLoading(state),
  errorMessage: extractRoleSelectionError(state)
});

const mapDispatchToProps = {
  selectRoles: selectRolesRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectRolePage);
