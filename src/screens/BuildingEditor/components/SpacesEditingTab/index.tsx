import React, { useRef } from 'react';
import { ISpaceTemplateDto } from '@screens/BookingCheckout/model/PaymentRequirementResponse';
import SpaceTemplateItem from '@screens/BuildingEditor/components/SpacesEditingTab/SpaceTemplateItem';
import AdditiveListView from '@components/AdditiveListView';
import { ENDPOINTS } from '@containers/Routing/endpoints';
import { useHistory } from 'react-router-dom';
import SpaceCreationModal from '@screens/BuildingEditor/components/SpacesEditingTab/SpaceCreationModal';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import { ISpaceTemplateModificationRequest } from '@screens/SpaceEditor/components/SpaceTemplateEditingForm';

export interface ISpacesEditingTabProps {
  spaceTemplates: ISpaceTemplateDto[];
  loading: boolean;
  createSpace: IBindingCallback1<ISpaceTemplateModificationRequest>;
  spaceCreationLoading: boolean;
}

const SpacesEditingTab: React.FC<ISpacesEditingTabProps> = (
  { spaceTemplates, loading, spaceCreationLoading, createSpace }
) => {
  const history = useHistory();
  const triggerOpenModalRef = useRef<IBindingAction>();
  return (
    <>
      <SpaceCreationModal
        triggerOpenRef={triggerOpenModalRef}
        createSpace={createSpace}
        creationLoading={spaceCreationLoading}
      />
      <AdditiveListView
        loading={loading}
        items={spaceTemplates}
        onAddClick={() => {
          triggerOpenModalRef.current();
        }}
        renderItem={st => <SpaceTemplateItem spaceTemplate={st} />}
        onItemClick={st => history.push(ENDPOINTS.SPACE_EDITOR(st.id))}
        placeholderText="No spaces created"
      />
    </>
  );
};

export default SpacesEditingTab;
