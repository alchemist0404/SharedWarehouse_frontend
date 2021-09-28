import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import SpaceEditingForm from '@screens/SpaceEditor/components/SpaceTemplateEditingForm';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import { ISpaceTemplateDto } from '@screens/BookingCheckout/model/PaymentRequirementResponse';
import {
  extractChosenSpace,
  extractFetchSpaceDetailsLoading, extractFetchSpacesBySpaceTemplateLoading,
  extractSaveSpaceTemplateLoading, extractSpaces,
  extractSpaceTemplate, extractSaveSpaceLoading
} from '@screens/SpaceEditor/reducers';
import {
  chooseSpaceRoutine,
  fetchSpaceDetailsRoutine,
  fetchSpacesBySpaceTemplateRoutine, hideSpaceRoutine,
  saveSpaceTemplateRoutine, saveSpaceRoutine
} from '@screens/SpaceEditor/routines';
import { useLocation, useParams } from 'react-router-dom';
import { ISaveRequest } from '@screens/SpaceEditor/containers/SpaceEditorPage/sagas';
import BackButton from '@screens/BuildingDetails/components/DescriptionSection/components/BackButton';
import SemanticTabs from '@components/SemanticTabs';
import { patchUrlQuery } from '@helpers/history.helper';
import { ISpaceDto } from '@screens/SpaceEditor/models/ISpaceDto';
import SpacesList from '@screens/SpaceEditor/components/SpacesList';
import { parse } from 'query-string';
import { ISpaceEdit } from '@screens/SpaceEditor/models/ISpaceEdit';

export interface ISpaceEditorProps extends IState, IActions {
}

interface IState {
  saveLoading: boolean;
  spaceTemplateLoading: boolean;
  spaceTemplate: ISpaceTemplateDto;
  spacesLoading: boolean;
  spaces: ISpaceDto[];
  chosenSpace?: Partial<ISpaceDto>;
  saveSpaceLoading: boolean;
}

interface IActions {
  saveTemplateSpace: IBindingCallback1<ISaveRequest>;
  loadSpaceTemplate: IBindingCallback1<string>;
  saveSpace: IBindingCallback1<ISpaceEdit>;
  loadSpaces: IBindingCallback1<string>;
  chooseSpace: IBindingCallback1<Partial<ISpaceDto>>;
  hideSpace: IBindingAction;
}

const SpaceEditor: React.FC<ISpaceEditorProps> = (
  { saveTemplateSpace, spaceTemplate, loadSpaceTemplate, saveLoading, spaceTemplateLoading,
    spaces, spacesLoading, saveSpaceLoading, loadSpaces, saveSpace,
    chooseSpace, hideSpace, chosenSpace }
) => {
  const location = useLocation();
  const { id: templateId } = useParams<{ id: string }>();
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
  }, [location.search, setActiveTab]);

  useEffect(() => {
    loadSpaceTemplate(templateId);
  }, [loadSpaceTemplate, templateId]);

  useEffect(() => {
    if (spaceTemplate) {
      loadSpaces(spaceTemplate.id);
    }
  }, [loadSpaces, spaceTemplate]);

  return (
    <div className={classNames('content_wrapper', styles.container)}>
      <BackButton />
      <h1>Editing space</h1>
      <div className={styles.tabs_section}>
        <SemanticTabs
          active={activeTab}
          onTabClick={handleTabClick}
          tabs={[
            {
              name: 'Details',
              content: (
                <SpaceEditingForm
                  saveSpace={data => saveTemplateSpace({ id: templateId, data })}
                  initialData={spaceTemplate}
                  loadingValues={spaceTemplateLoading}
                  saveLoading={saveLoading}
                />
              )
            },
            {
              name: 'Spaces',
              content: (
                <SpacesList
                  spaces={spaces}
                  saveSpace={saveSpace}
                  chooseSpace={chooseSpace}
                  hideSpace={hideSpace}
                  chosenSpace={chosenSpace}
                  saveSpaceLoading={saveSpaceLoading}
                  spacesLoading={spacesLoading}
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
  saveLoading: extractSaveSpaceTemplateLoading(state),
  spaceTemplateLoading: extractFetchSpaceDetailsLoading(state),
  spaceTemplate: extractSpaceTemplate(state),
  spacesLoading: extractFetchSpacesBySpaceTemplateLoading(state),
  spaces: extractSpaces(state),
  chosenSpace: extractChosenSpace(state),
  saveSpaceLoading: extractSaveSpaceLoading(state)
});

const mapDispatchToProps: IActions = {
  loadSpaceTemplate: fetchSpaceDetailsRoutine,
  loadSpaces: fetchSpacesBySpaceTemplateRoutine,
  saveSpace: saveSpaceRoutine,
  saveTemplateSpace: saveSpaceTemplateRoutine,
  chooseSpace: chooseSpaceRoutine.fulfill,
  hideSpace: hideSpaceRoutine.fulfill
};

export default connect(mapStateToProps, mapDispatchToProps)(SpaceEditor);
