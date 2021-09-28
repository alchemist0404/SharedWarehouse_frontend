import React from 'react';
import ErrorPopup, { IPopupPosition } from '@components/FormErrorPopup';
import { FieldHookConfig } from 'formik/dist/Field';
import { useField } from 'formik';

export interface ICommonInputProps<T extends HTMLElement, SemanticProps> {
  propsOrFieldName: string | FieldHookConfig<T>;
  semanticProps?: SemanticProps;
  popupPosition?: IPopupPosition;
  element?: React.FC<SemanticProps> | React.ComponentClass<SemanticProps>;
}

function CommonInput<T extends HTMLElement, SemanticProps>(
  { popupPosition, propsOrFieldName, semanticProps, element: Element }: ICommonInputProps<T, SemanticProps>
) {
  const [field, meta] = useField(propsOrFieldName);
  const isError = !!(meta.touched && meta.error);

  return (
    <ErrorPopup
      open={false}
      label={meta.error}
      position={popupPosition}
      component={(
        <Element
          error={isError}
          {...field}
          {...semanticProps}
          {...propsOrFieldName}
          value={field.value || ''}
        />
      )}
    />
  );
}

export default CommonInput;
