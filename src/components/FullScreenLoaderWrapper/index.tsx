import React, { FunctionComponent, useState } from 'react';
import GradientLoader from '@components/GradientLoader';
import { CSSTransition } from 'react-transition-group';
import './animations.scss';

interface ILoaderWrapperProps {
  loading: boolean;
  loadingText?: string;
}

const FullScreenLoaderWrapper: FunctionComponent<ILoaderWrapperProps> = (
  { loading, loadingText, children }
) => {
  const [showChildren, setShowChildren] = useState<boolean>(true);

  return (
    <>
      <CSSTransition
        in={loading}
        timeout={{
          exit: 1200
        }}
        classNames="loader"
        unmountOnExit
        onEnter={() => {
          setShowChildren(false);
        }}
        onExiting={() => {
          setShowChildren(true);
        }}
      >
        <GradientLoader fullScreen loadingText={loadingText} />
      </CSSTransition>
      {showChildren && children}
    </>
  );
};

export default FullScreenLoaderWrapper;
