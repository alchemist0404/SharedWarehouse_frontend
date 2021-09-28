import React from 'react';
import SearchSelectorPopup from '@screens/Landing/components/search/SearchSelectorPopup';

export interface ISearchSelectorProps {
  index: number;
  activeIndex: number;
  handleClick: (index: number) => void;
  trigger: JSX.Element;
  content: JSX.Element;
  closeOnDocumentClick?: boolean;
}

const SearchSelector: React.FC<ISearchSelectorProps> = (
  { content, trigger, index, activeIndex, handleClick, closeOnDocumentClick }
) => (
  <SearchSelectorPopup
    trigger={trigger}
    content={content}
    open={activeIndex === index}
    onClose={() => handleClick(index)}
    hideOnScroll
    closeOnDocumentClick={closeOnDocumentClick}
  />
);

export default SearchSelector;
