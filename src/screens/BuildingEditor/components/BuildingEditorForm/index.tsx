import React from 'react';
import { Button, Form, FormGroup } from 'semantic-ui-react';
import { FormikProps, withFormik } from 'formik';
import FormikInput from '@components/formik/Input';
import FormikTextArea from '@components/formik/TextArea';
import FormikTagSelector from '@components/formik/TagSelector';
import _ from 'lodash';
import { IBindingCallback1 } from '@models/Callbacks';
import { IBuildingForEditing } from '@screens/BuildingDetails/model/BuildingDetailsResponse';
import { IBuildingForSave } from '@screens/BuildingEditor/model/BuildingForSave';
import styles from './styles.module.scss';
import FormikSelect from '@components/formik/Select';
import { BuildingType } from '@models/domain/BuildingType';
import { enumAsOptions } from '@helpers/enum.helper';
import * as Yup from 'yup';
import { CountryState } from '@models/domain/CountryState';

export interface IBuildingEditorFormProps {
  initialValues?: IBuildingForEditing;
  loadingValues?: boolean;
  saveBuilding: IBindingCallback1<IBuildingForSave>;
  tags: string[];
  tagsLoading: boolean;
  className?: string;
  saveLoading: boolean;
}

interface IFormProps {
  buildingName: string;
  address1: string;
  address2: string;
  city: string;
  zip: string;
  state: string;
  description: string;
  type: string;
  tags: string[];
}

const defaultFormValues: IFormProps = {
  address1: '',
  address2: '',
  city: '',
  buildingName: '',
  zip: '',
  state: '',
  description: '',
  type: '',
  tags: []
};

const buildingToForm: (building: IBuildingForEditing) => IFormProps = building => ({
  type: building.type,
  tags: building.tags,
  description: building.description,
  buildingName: building.buildingName,
  zip: building.location.zip,
  city: building.location.city,
  address2: building.location.address2,
  address1: building.location.address1,
  state: building.location.state
});

const validationSchema = Yup.object().shape({
  buildingName: Yup.string().min(1).required(),
  type: Yup.string().required('You must select the type of the building'),
  address1: Yup.string().min(1).required(),
  address2: Yup.string().notRequired().nullable(),
  city: Yup.string().min(1).required(),
  description: Yup.string().notRequired().nullable(),
  state: Yup.string().min(2, 'The state must be in a format of 2 characters')
    .max(2, 'The state must be in a format of 2 characters').required(), // replace with dropdown
  tags: Yup.array().required(),
  zip: Yup.string().required()
});

const formToBuilding: (formData: IFormProps) => IBuildingForSave = formData => ({
  ...formData
});

export const vagueEquals = (o1, o2) => {
  if (!o1 && !o2) return true;
  // eslint-disable-next-line eqeqeq
  if (o1 == o2) return true;
  return undefined;
};

const BuildingEditorForm: React.FC<IBuildingEditorFormProps & FormikProps<IFormProps>> = (
  { handleSubmit, values, initialValues, tags, tagsLoading, loadingValues = false, className, saveLoading }
) => (
  <Form onSubmit={handleSubmit} loading={loadingValues} className={className}>
    <FormikSelect
      propsOrFieldName={{
        placeholder: 'Building type',
        name: 'type'
      }}
      semanticProps={{
        options: enumAsOptions(BuildingType),
        required: true,
        label: 'Building type'
      }}
    />
    <FormikInput
      propsOrFieldName={{
        name: 'buildingName',
        placeholder: 'Building Name'
      }}
      semanticProps={{
        label: 'Building Name',
        required: true
      }}
    />
    <FormGroup widths="equal">
      <FormikInput
        propsOrFieldName={{
          name: 'address1',
          placeholder: 'Street Address 1'
        }}
        semanticProps={{
          label: 'Address 1',
          required: true
        }}
      />
      <FormikInput
        propsOrFieldName={{
          name: 'address2',
          placeholder: 'Street Address 2'
        }}
        semanticProps={{
          label: 'Address 2'
        }}
      />
    </FormGroup>
    <FormGroup widths="equal">
      <FormikInput
        propsOrFieldName={{
          name: 'city',
          placeholder: 'City'
        }}
        semanticProps={{
          width: '4',
          label: 'City',
          required: true
        }}
      />
      <FormikInput
        propsOrFieldName={{
          name: 'zip',
          placeholder: 'State Zip'
        }}
        semanticProps={{
          width: '4',
          label: 'Zip',
          required: true
        }}
      />
    </FormGroup>
    <FormikSelect
      propsOrFieldName={{
        name: 'state',
        placeholder: 'State'
      }}
      semanticProps={{
        options: enumAsOptions(CountryState),
        required: true,
        label: 'State'
      }}
    />
    <h2>More...</h2>
    <FormikTextArea
      propsOrFieldName={{
        name: 'description',
        placeholder: 'What makes this building attractive to propsective guests'
      }}
      semanticProps={{
        label: 'About this building'
      }}
    />
    <h2>Features</h2>
    <FormikTagSelector
      propsOrFieldName={{ name: 'tags', placeholder: 'Standard features' }}
      semanticProps={{
        className: styles.tags_selector,
        fluid: true,
        loading: tagsLoading,
        options: tags.map(t => ({
          key: t,
          value: t,
          text: t
        })),
        required: true
      }}
    />
    <Button
      className={styles.submit_button}
      type="submit"
      content="Save"
      color="olive"
      disabled={_.isEqualWith(initialValues, values, vagueEquals)}
      loading={saveLoading}
    />
  </Form>
);

export default withFormik<IBuildingEditorFormProps, IFormProps>({
  displayName: 'BuildingEditorForm',
  enableReinitialize: true,
  mapPropsToValues: props => (props.initialValues ? buildingToForm(props.initialValues) : defaultFormValues),
  handleSubmit: ((values, { props }) => props.saveBuilding(formToBuilding(values))),
  validationSchema
})(BuildingEditorForm);
