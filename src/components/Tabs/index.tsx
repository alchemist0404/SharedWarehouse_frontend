import React, { useCallback, useState } from 'react';
import styles from './styles.module.scss';
import { Button } from 'semantic-ui-react';

export interface ITabsProps {
  content: ITabElement[];
  className?: string;
  wrapper?: IReactFCWithProps;
}

export interface ITabElement {
  key: any;
  name: string;
  element: IReactFCWithProps;
}

export interface IReactFCWithProps {
  Element: any;
  props?: any;
}

const Tabs: React.FC<ITabsProps> = (
  { content, wrapper, className }
) => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const mappedContent = useCallback(() => content.map((c, index) => (
    tabIndex === index && <c.element.Element key={c.key} {...c.element.props} />
  )), [content, tabIndex]);

  return (
    <>
      <div className={`${styles.tabs} ${className || ''}`}>
        {content.map((c, index) => (
          <Button
            key={c.key}
            className={`${styles.tab_button} ${tabIndex === index ? styles.active : ''}`}
            content={c.name}
            onClick={() => setTabIndex(index)}
          />
        ))}
      </div>
      {wrapper ? (
        <wrapper.Element {...wrapper.props}>
          {mappedContent()}
        </wrapper.Element>
      ) : (
        <>
          {mappedContent()}
        </>
      )}
    </>
  );
};

export default Tabs;
