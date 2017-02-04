import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import {Application} from './folding';

test('just works', () => {
  const component = renderer.create(
    <Application />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
