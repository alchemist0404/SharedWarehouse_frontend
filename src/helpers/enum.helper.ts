import _ from 'lodash';
import { DropdownItemProps } from 'semantic-ui-react';

export const enumAsOptions = Enum => Object.keys(Enum).filter(k => !_.isNumber(k)).map(type => ({
  key: type,
  value: type,
  text: Enum[type]
}) as DropdownItemProps);

export const enumAsNullableOptions = Enum => [
  {
    key: null,
    value: null,
    text: '-'
  },
  ...enumAsOptions(Enum)
];
