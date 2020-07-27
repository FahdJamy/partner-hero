import  React from 'react';
import { create, ReactTestRenderer, ReactTestInstance ,act} from "react-test-renderer";
import Favourites from '../components/Favourites';
import { Button, Modal } from 'react-bootstrap';

const props = {
  favourites: {},
  onDeleteFavourite: jest.fn(),
  onDeleteAllFavourites: jest.fn(),
  onPictureDetails: jest.fn(),
}


describe('Favourites Component', () => {
  let component: ReactTestRenderer;
  let instance: ReactTestInstance;

  beforeAll(() => {
    jest.resetAllMocks();
    component = create(<Favourites {...props}/>);
    instance = component.root;
  })

  test('Should render Favourite component', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('should disabled button if no favourites', () => {
    const button = instance.findByType(Button);
    expect(button.props.disabled).toBeTruthy();
  })

  it('set modal to visible', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation(() => [{}, setState])
    const button = instance.findByType(Button);
    act(() => {
      button.props.onClick();
    })
    const modal = instance.findByType(Modal);
    expect(modal).toBeDefined();
  })
  

  
});
