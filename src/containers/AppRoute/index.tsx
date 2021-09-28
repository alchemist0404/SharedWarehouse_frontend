import React, { useEffect } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFooterOrange } from '@containers/AppRoute/reducer';

export interface IAppRouteProps extends RouteProps {
  // should the footer be orange
  orange?: boolean;
}

const AppRoute: React.FC<IAppRouteProps> = ({ orange, ...props }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFooterOrange(!!orange));
  }, [dispatch, orange]);

  return (
    <Route {...props} />
  );
};

export default AppRoute;
