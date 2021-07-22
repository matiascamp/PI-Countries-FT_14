import React from 'react';
import {NavLink} from "react-router-dom"
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Landing from './LandingPage';

configure({adapter: new Adapter()});

describe('<LandingPage />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Landing />)
  })

  it('Deberia renderizar Un <NavLink />', () => {
    expect(wrapper.find(NavLink)).toHaveLength(1);
  });
  it('El Link debe cambiar la ruta hacia "/home".', () => {
    //el orden donde declaran los Links es importante
    expect(wrapper.find(NavLink).at(0).prop('to')).toEqual('/home');
  });
})