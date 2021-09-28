import React, { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader } from 'semantic-ui-react';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import SpaceEditingForm, { ISpaceTemplateModificationRequest } from '@screens/SpaceEditor/components/SpaceTemplateEditingForm';

export interface ISpaceCreationModalProps {
  triggerOpenRef?: React.MutableRefObject<IBindingAction>;
  createSpace: IBindingCallback1<ISpaceTemplateModificationRequest>;
  creationLoading: boolean;
}

const SpaceCreationModal: React.FC<ISpaceCreationModalProps> = (
  { triggerOpenRef, creationLoading, createSpace }
) => {
  const [open, setOpen] = useState<boolean>();

  useEffect(() => {
    triggerOpenRef.current = () => {
      setOpen(true);
    };
  }, [triggerOpenRef]);

  return (
    <Modal open={open} onClose={() => setOpen(false)} closeOnEscape={false} size="small">
      <ModalHeader>Create new space</ModalHeader>
      <ModalContent>
        <SpaceEditingForm
          saveLoading={creationLoading}
          loadingValues={false}
          saveSpace={createSpace}
          initialData={undefined}
        />
      </ModalContent>
    </Modal>
  );
};

export default SpaceCreationModal;
