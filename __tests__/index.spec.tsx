import * as React from 'react'
import {mount, shallow} from 'enzyme'
import IndexPage from '../pages/index'

describe('Pages', () => {
  describe('Index', () => {
    const testValues = {
      email: 'm.garcia.tejeda@gmail.com',
      password: 'password',
      handleChange: jest.fn(),
  };
    it('has a form to sign in', function () {
      const wrap = mount(<IndexPage/>);
      expect(wrap.exists('form')).toEqual(true)
    });
    it('the form has an input called email of type text', function () {
      const wrap = mount(<IndexPage/>);
      expect(wrap.exists('input[name="email"]')).toEqual(true)
      expect(wrap.exists('input[type="text"]')).toEqual(true)
    });
    it('the form has an input called password of type pass', function () {
      const wrap = mount(<IndexPage/>);
      expect(wrap.exists('input[name="password"]')).toEqual(true)
      expect(wrap.exists('input[type="password"]')).toEqual(true)
    })
    it('the form has an input type submit', function () {
      const wrap = mount(<IndexPage/>);
      expect(wrap.exists('input[type="submit"]')).toEqual(true)
    })
    it('has a logo image', function () {
      const wrap = mount(<IndexPage/>);
      expect(wrap.exists('img')).toEqual(true)
    })
    it('has a "forgot your password" text', function () {
      const wrap = mount(<IndexPage/>);
      expect(wrap.find('p[className="forg-pass"]').text()).toBe('Forgot your password?')
    })
    it('setting email and password as state', function () {
      const wrap = mount(<IndexPage/>);
      wrap.find('input[name="email"]').simulate("change", { target: { name: 'email', value: testValues.email } });
      wrap.find('input[name="password"]').simulate("change", { target: { name: 'password',value: testValues.password } });
      expect(wrap.state('name')).toEqual(testValues.email);
      expect(wrap.state('password')).toEqual(testValues.email);
    })
  })  
})
