import React, { useCallback, useEffect, useState } from 'react';
import { FormikProps, withFormik } from 'formik';
import { Button, Form, FormGroup, FormInput, Icon } from 'semantic-ui-react';
import FormikInput from '@components/formik/Input';
import FormikSelect from '@components/formik/Select';
import { SpaceCategory } from '@models/domain/space/SpaceCategories';
import { enumAsOptions } from '@helpers/enum.helper';
import { LengthUnit } from '@models/domain/LengthUnit';
import styles from './styles.module.scss';
import { SpaceType } from '@models/domain/space/SpaceTypes';
import _ from 'lodash';
import { vagueEquals } from '@screens/BuildingEditor/components/BuildingEditorForm';
import { ISpaceTemplateDto } from '@screens/BookingCheckout/model/PaymentRequirementResponse';
import { toPrice } from '@helpers/price.helper';
import * as Yup from 'yup';

export interface ISpaceTemplateEditingFormProps {
  initialData?: ISpaceTemplateDto;
  loadingValues: boolean;
  saveLoading: boolean;
  saveSpace: (space: ISpaceTemplateModificationRequest) => void;
  className?: string;
}

interface IFormValues {
  alias: string;
  category: string;
  type: string;
  length: string;
  width: string;
  height: string;
  lengthUnit: string;
  price: string;
}

const defaultFormValues: IFormValues = {
  alias: '',
  category: '',
  type: '',
  length: '',
  width: '',
  height: '',
  lengthUnit: '',
  price: ''
};

export const dtoToForm: (dto: ISpaceTemplateDto) => IFormValues = dto => ({
  lengthUnit: dto.lengthUnit,
  length: dto.length.toString(),
  height: dto.height.toString(),
  category: dto.category,
  alias: dto.alias,
  type: dto.type,
  width: dto.width.toString(),
  price: dto.pricePerDay.amount.toString()
});

const validationSchema = Yup.object().shape({
  alias: Yup.string().min(1).required(),
  price: Yup.string().required(),
  width: Yup.string().required(),
  length: Yup.string().required(),
  height: Yup.string().required(),
  type: Yup.string().required(),
  category: Yup.string().required(),
  lengthUnit: Yup.string().required()
});

export type ISpaceTemplateModificationRequest = IFormValues;

const dailyToMonthly = price => toPrice(price * 30);

const SpaceTemplateEditingForm: React.FC<ISpaceTemplateEditingFormProps & FormikProps<IFormValues>> = (
  { handleSubmit, loadingValues, className, values, initialValues, saveLoading, setFieldValue }
) => {
  const [monthlyPrice, setMonthlyPrice] = useState('');

  const updateMonthlyPrice = useCallback(() => {
    setMonthlyPrice(dailyToMonthly(values.price));
  }, [values.price]);

  const updateDailyPrice = useCallback(() => {
    setFieldValue('price', toPrice(+monthlyPrice / 30));
  }, [monthlyPrice, setFieldValue]);

  useEffect(() => {
    setMonthlyPrice(dailyToMonthly(initialValues.price));
  }, [initialValues]);

  return (
    <Form onSubmit={handleSubmit} loading={loadingValues} className={className}>
      <FormikInput
        propsOrFieldName={{
          name: 'alias',
          placeholder: 'Wooden pallet'
        }}
        semanticProps={{
          label: 'Name',
          required: true
        }}
      />
      <FormikSelect
        propsOrFieldName={{
          name: 'category',
          placeholder: 'Space category'
        }}
        semanticProps={{
          options: enumAsOptions(SpaceCategory),
          required: true
        }}
      />
      <FormikSelect
        propsOrFieldName={{
          name: 'type',
          placeholder: 'Space type'
        }}
        semanticProps={{
          options: enumAsOptions(SpaceType),
          required: true
        }}
      />
      <FormGroup widths="equal">
        <FormikInput
          propsOrFieldName={{ name: 'length', placeholder: '0' }}
          semanticProps={{ label: 'Length', required: true }}
        />
        <FormikInput
          propsOrFieldName={{ name: 'height', placeholder: '0' }}
          semanticProps={{ label: 'Height', required: true }}
        />
        <FormikInput
          propsOrFieldName={{ name: 'width', placeholder: '0' }}
          semanticProps={{ label: 'Width', required: true }}
        />
      </FormGroup>
      <FormikSelect
        propsOrFieldName={{ name: 'lengthUnit', placeholder: 'Meters/Feet' }}
        semanticProps={{ options: enumAsOptions(LengthUnit), className: styles.selector, required: true }}
      />
      <FormGroup widths="equal">
        <FormikInput
          propsOrFieldName={{
            name: 'price',
            placeholder: '1.00',
            onBlur: updateMonthlyPrice
          }}
          semanticProps={{
            label: 'Price per day',
            required: true
          }}
        />
        <Icon name="linkify" className={styles.link_icon} />
        <FormInput
          label="Price per 30 days"
          value={monthlyPrice}
          onChange={ev => setMonthlyPrice(ev.target.value)}
          onBlur={updateDailyPrice}
        />
      </FormGroup>
      <Button
        className={styles.button}
        type="submit"
        color="olive"
        content="Save"
        disabled={_.isEqualWith(initialValues, values, vagueEquals)}
        loading={saveLoading}
      />
    </Form>
  );
};

export default withFormik<ISpaceTemplateEditingFormProps, IFormValues>({
  displayName: 'SpaceEditorForm',
  enableReinitialize: true,
  mapPropsToValues: props => (props.initialData ? dtoToForm(props.initialData) : defaultFormValues),
  handleSubmit: (values, { props }) => props.saveSpace(values),
  validationSchema
})(SpaceTemplateEditingForm);
