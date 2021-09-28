import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import BackButton from '@screens/BuildingDetails/components/DescriptionSection/components/BackButton';
import CompanyName from '@screens/BuildingDetails/components/DescriptionSection/components/CompanyName';
import { IBuildingForEditing } from '@screens/BuildingDetails/model/BuildingDetailsResponse';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { IPassedState } from '@screens/BuildingDetails/containers/BuildingDetailsPage';
import ScrollToTopOnMount from '@components/ScrollToTop';
import BuildingName from '@screens/BuildingDetails/components/DescriptionSection/components/BuildingName';
import { ISpaceTemplateDto } from '@screens/BookingCheckout/model/PaymentRequirementResponse';
import {
  extractBuilding,
  extractCreateSpaceLoading,
  extractFetchBuildingDetailsLoading,
  extractFetchTagsLoading,
  extractSaveBuildingLoading,
  extractSpaceTemplates,
  extractTags,
  extractUploadImagesError,
  extractUploadImagesLoading
} from '@screens/BuildingEditor/reducers';
import {
  createSpaceRoutine,
  deleteImageRoutine,
  fetchBuildingDetailsRoutine,
  fetchTagsRoutine,
  saveBuildingRoutine,
  setAsAvatarRoutine,
  uploadImagesRoutine
} from '@screens/BuildingEditor/routines';
import BuildingEditorForm from '@screens/BuildingEditor/components/BuildingEditorForm';
import {
  IBuildingImageActionRequest,
  IBuildingImagesUploadRequest,
  IBuildingSaveRequest
} from '@screens/BuildingEditor/services/building.service';
import SpacesEditingTab from '@screens/BuildingEditor/components/SpacesEditingTab';
import { parse } from 'query-string';
import { patchUrlQuery } from '@helpers/history.helper';
import { ISpaceTemplateCreationRequest } from '@screens/BuildingEditor/model/SpaceTemplateCreation';
import SemanticTabs from '@components/SemanticTabs';
import ImagesTab from '@screens/BuildingEditor/components/ImagesTab';

export interface IBuildingEditorProps extends IState, IActions {
}

interface IState {
  building: IBuildingForEditing;
  spaceTemplates: ISpaceTemplateDto[];
  buildingLoading: boolean;
  tags: string[];
  tagsLoading: boolean;
  saveLoading: boolean;
  spaceCreationLoading: boolean;
  imagesUploading: boolean;
  imagesUploadError: string;
}

interface IActions {
  loadBuilding: IBindingCallback1<string>;
  saveBuilding: IBindingCallback1<IBuildingSaveRequest>;
  loadTags: IBindingAction;
  createTemplate: IBindingCallback1<ISpaceTemplateCreationRequest>;
  uploadImages: IBindingCallback1<IBuildingImagesUploadRequest>;
  deleteImage: IBindingCallback1<IBuildingImageActionRequest>;
  setImageAsAvatar: IBindingCallback1<IBuildingImageActionRequest>;
}

const BuildingEditor: React.FC<IBuildingEditorProps> = (
  {
    building, loadBuilding, buildingLoading, spaceTemplates, saveBuilding, tags, tagsLoading, loadTags, saveLoading,
    createTemplate, spaceCreationLoading, imagesUploading, uploadImages, deleteImage, imagesUploadError,
    setImageAsAvatar
  }
) => {
  const history = useHistory();
  const location = useLocation();
  const { id: buildingId } = useParams<{ id: string }>();
  const passedState: IPassedState | undefined = history.location.state;
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = index => {
    setActiveTab(index);
    patchUrlQuery({ tab: index });
  };

  useEffect(() => {
    const { tab } = parse(location.search);
    if (tab) {
      setActiveTab(+tab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  useEffect(() => {
    if (buildingId) {
      loadBuilding(buildingId as string);
    }
    loadTags();
  }, [buildingId, loadBuilding, loadTags]);

  return (
    <div className={classNames('content_wrapper', styles.container)}>
      <ScrollToTopOnMount />
      <BackButton />
      <CompanyName loading={buildingLoading} building={building} />
      <BuildingName
        loading={buildingLoading}
        previewBuildingName={passedState?.buildingName}
        building={building as any}
      />
      <div className={styles.tabs_section}>
        <SemanticTabs
          active={activeTab}
          onTabClick={handleTabClick}
          tabs={[
            {
              name: 'Details',
              content: (
                <BuildingEditorForm
                  saveLoading={saveLoading}
                  className={styles.form}
                  loadingValues={buildingLoading}
                  initialValues={building}
                  saveBuilding={val => saveBuilding({ building: val, id: building.id })}
                  tags={tags}
                  tagsLoading={tagsLoading}
                />
              )
            },
            {
              name: 'Spaces',
              content: (
                <SpacesEditingTab
                  spaceTemplates={spaceTemplates}
                  loading={buildingLoading}
                  createSpace={data => createTemplate({ ...data, buildingId: building.id })}
                  spaceCreationLoading={spaceCreationLoading}
                />
              )
            },
            {
              name: 'Images',
              content: (
                <ImagesTab
                  images={building?.images || []}
                  uploading={imagesUploading}
                  uploadImages={formData => uploadImages({ id: building?.id, formData })}
                  deleteImage={imageId => deleteImage({ buildingId: building?.id, imageId })}
                  uploadError={imagesUploadError}
                  setImageAsAvatar={imageId => setImageAsAvatar({ buildingId: building?.id, imageId })}
                />
              )
            }
          ]}
        />
      </div>
    </div>
  );
};

const mapStateToProps: (state) => IState = state => ({
  building: extractBuilding(state),
  spaceTemplates: extractSpaceTemplates(state),
  buildingLoading: extractFetchBuildingDetailsLoading(state),
  tags: extractTags(state),
  tagsLoading: extractFetchTagsLoading(state),
  saveLoading: extractSaveBuildingLoading(state),
  spaceCreationLoading: extractCreateSpaceLoading(state),
  imagesUploading: extractUploadImagesLoading(state),
  imagesUploadError: extractUploadImagesError(state)
});

const mapDispatchToProps: IActions = {
  loadBuilding: fetchBuildingDetailsRoutine,
  saveBuilding: saveBuildingRoutine,
  loadTags: fetchTagsRoutine,
  createTemplate: createSpaceRoutine,
  uploadImages: uploadImagesRoutine,
  deleteImage: deleteImageRoutine,
  setImageAsAvatar: setAsAvatarRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(BuildingEditor);
