import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalContent, ModalHeader } from 'semantic-ui-react';
import BuildingEditorForm from '@screens/BuildingEditor/components/BuildingEditorForm';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import { IBuildingForSave } from '@screens/BuildingEditor/model/BuildingForSave';

export interface IAddButtonWithModalProps {
  loadTags: IBindingAction;
  tagsLoading: boolean;
  createBuilding: IBindingCallback1<IBuildingForSave>;
  creationLoading: boolean;
  tags: string[];
}

const AddButtonWithModal: React.FC<IAddButtonWithModalProps> = (
  { creationLoading, createBuilding, tagsLoading, loadTags, tags }
) => {
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    loadTags();
  }, [loadTags]);

  return (
    <>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} closeOnEscape={false}>
        <ModalHeader>Create building</ModalHeader>
        <ModalContent>
          <BuildingEditorForm
            saveLoading={creationLoading}
            tagsLoading={tagsLoading}
            tags={tags}
            saveBuilding={createBuilding}
          />
        </ModalContent>
      </Modal>
      <Button
        color="orange"
        content="Add new"
        icon="plus"
        onClick={() => setModalOpen(true)}
      />
    </>
  );
};

export default AddButtonWithModal;
