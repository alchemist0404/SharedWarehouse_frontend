import React from 'react';
import { Menu, MenuItem, Segment } from 'semantic-ui-react';

export interface ISemanticTabsProps {
  active: number | string;
  onTabClick: (index: number | string) => void;
  tabs: ITabData[];
}

interface ITabData {
  name: string;
  content: JSX.Element | React.FC;
}

const SemanticTabs: React.FC<ISemanticTabsProps> = ({ tabs, active, onTabClick }) => (
  <>
    <Menu attached="top" tabular>
      {tabs.map((t, index) => (
        <MenuItem
          key={t.name}
          name={t.name}
          active={active === index}
          onClick={() => onTabClick(index)}
        />
      ))}
    </Menu>
    <Segment attached="bottom">
      {tabs.filter((t, index) => index === active).map(({ content }) => content)}
    </Segment>
  </>
);

export default SemanticTabs;
