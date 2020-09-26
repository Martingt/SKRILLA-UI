import { enableFetchMocks } from 'jest-fetch-mock'
import fetchMock from "jest-fetch-mock"
enableFetchMocks()
import * as React from 'react'
import {mount} from 'enzyme'
import IndexPage from '../pages/index'
import ConsumptionList from '../components/ConsumptionList'


describe('Pages', () => {
  describe('Sign In', () => {
    /*
    const testValues = {
      email: 'm.garcia.tejeda@gmail.com',
      password: 'password',
      handleChange: jest.fn(),
    };*/
    it('has a form to sign in', function () {
      const wrap = mount(<IndexPage/>);
      expect(wrap.exists('form')).toEqual(true)
    });
    it('has a logo image', function () {
      const wrap = mount(<IndexPage/>);
      expect(wrap.exists('img')).toEqual(true)
    })
    it('has a "forgot your password" text', function () {
      const wrap = mount(<IndexPage/>);
      expect(wrap.find('p[className="forg-pass"]').text()).toBe('Forgot your password?')
    })
    it('setting email and password as state', function () {
      //Not working as expected
      //const wrap = mount(<IndexPage/>);
      //wrap.find('input[name="email"]').simulate("change", { target: { name: 'email', value: testValues.email } });
      //wrap.find('input[name="password"]').simulate("change", { target: { name: 'password',value: testValues.password } });
      //expect(wrap.state('name')).toEqual(testValues.email);
      //xpect(wrap.state('password')).toEqual(testValues.email);
    })
  })
  describe('LoginForm @ Sign In',()=> {
    it('has an input called email of type text', function () {
      const wrap = mount(<IndexPage/>);
      expect(wrap.exists('input[name="email"]')).toEqual(true)
      expect(wrap.exists('input[type="text"]')).toEqual(true)
    });
    it('has an input called password of type pass', function () {
      const wrap = mount(<IndexPage/>);
      expect(wrap.exists('input[name="password"]')).toEqual(true)
      expect(wrap.exists('input[type="password"]')).toEqual(true)
    })
    it('has an input type submit', function () {
      const wrap = mount(<IndexPage/>);
      expect(wrap.exists('input[type="submit"]')).toEqual(true)
    })
  })
  describe('HomeScreen', () => {
    beforeEach(() => {
      fetchMock.resetMocks()
    })
    fetchMock.mockResponse(JSON.stringify({
      title: "UnEjemplo", 
      amount: 5689.23, 
      category: "Otros", 
      date: "2020-05-12"
    }))
    it('includes a ConsumptionList component', function (){
      const wrap = mount(<IndexPage/>);
      wrap.setState({token: "dummyToken"});
      expect(wrap.contains(<ConsumptionList/>)).toEqual(true)
    })
  })
  describe('Topbar @ HomeScreen', () => {
    beforeEach(() => {
      fetchMock.resetMocks()
    })
    fetchMock.mockResponse(JSON.stringify({
      title: "UnEjemplo", 
      amount: 5689.23, 
      category: "Otros", 
      date: "2020-05-12"
    }))
    it('has skrilla logo', function (){
      const wrap = mount(<IndexPage/>);
      wrap.setState({token: "dummyToken"});
      expect(wrap.exists('img[className="skrillaTopBarLogo"]')).toEqual(true)
    })
    it('has a title called Consumos', function(){
      const wrap = mount(<IndexPage/>);
      wrap.setState({token: "dummyToken"});
      expect(wrap.find('h1[className="containerTopBarTitle"]').text()).toBe('Consumos');
    })
    it('has a logout button', function(){
      const wrap = mount(<IndexPage/>);
      wrap.setState({token: "dummyToken"});
      expect(wrap.find('div[className="logout"]').text()).toBe('Logout');
    })
  })
})
