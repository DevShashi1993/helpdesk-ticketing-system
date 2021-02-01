import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const SecuredRoute = ({ element: Component, ...rest }) => {
  const { user, validToken } = useSelector(state => state.authState);

  return validToken === true ? (
    <Route {...rest} element={<Component />} />
  ) : (
    <Route {...rest} element={<Navigate to="/login" />} />
  );
};

export default SecuredRoute;
