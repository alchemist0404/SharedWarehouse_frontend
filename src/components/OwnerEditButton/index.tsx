import React, { useCallback } from 'react';
import { visibleToSpecificHave } from '@helpers/authRules.helper';
import { Button, ButtonProps } from 'semantic-ui-react';

export interface IOwnerEditButtonProps {
  ownerId: string;
  buttonProps?: ButtonProps;
}

const OwnerEditButton: React.FC<IOwnerEditButtonProps> = (
  { ownerId, buttonProps }
) => {
  const Btn = useCallback(visibleToSpecificHave(ownerId)(
    () => <Button content="Edit" color="orange" basic {...buttonProps} />
  ), [ownerId, buttonProps]);
  return <Btn />;
};

export default OwnerEditButton;
