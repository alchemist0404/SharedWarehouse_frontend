import React from 'react';
import { ISearchSelector } from '../model/SearchSelector';

export type ISpaceAmountSelectorProps = ISearchSelector

const SpaceAmountSelector: React.FC<ISpaceAmountSelectorProps> = ({ value, onChange }) => (
  <h3>Select space amount (not implemented)</h3>
);

export default SpaceAmountSelector;
