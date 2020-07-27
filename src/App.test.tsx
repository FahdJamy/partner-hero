import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from "react-redux";
import App from './App';
const mockStore = configureStore();

const store = mockStore({picture: {
  picture: {}
}})


test('renders learn react link', () => {
  const { toJSON } = render(<Provider store={store}><App /></Provider>);
  expect(toJSON).toMatchSnapshot()
  
});
