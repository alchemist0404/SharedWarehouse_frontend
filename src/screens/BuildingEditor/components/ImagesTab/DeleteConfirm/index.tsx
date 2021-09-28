import React from 'react';
import { Confirm } from 'semantic-ui-react';
import { IBindingCallback1 } from '@models/Callbacks';

export interface IDeleteConfirmProps {
  pendingDelete: string;
  setPendingDelete: React.Dispatch<React.SetStateAction<string>>;
  deleteImage: IBindingCallback1<string>;
}

const DeleteConfirm: React.FC<IDeleteConfirmProps> = (
  { setPendingDelete, pendingDelete, deleteImage }
) => (
  <Confirm
    size="mini"
    confirmButton="Delete"
    open={!!pendingDelete}
    onConfirm={() => {
      deleteImage(pendingDelete);
      setPendingDelete(undefined);
    }}
    onCancel={() => setPendingDelete(undefined)}
  />
);

export default DeleteConfirm;
