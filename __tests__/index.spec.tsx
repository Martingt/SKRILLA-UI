import * as React from 'react'
import {mount} from 'enzyme'
import IndexPage from '../pages/index'
import fetch from 'cross-fetch';

describe('Pages', () => {
  describe('Index', () => {
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
  })  
})

describe('Authentication', () => {
  it('has a token after successfully logged in', function() {

    const getResponseStatusAfterLoggedIn = async () => {
      const response = await fetch('http://localhost:59418/connect/token', {
        body: JSON.stringify({
          client_id: 'skrilla',
          client_secret: 'secret',
          grant_type: 'password',
          Scope: 'skrilla',
          username: 'm.garcia.tejeda@gmail.com',
          password: 'password',
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      
      //return response.status;
      if (response.status !== 400) {
        const content = await response.json();
        console.log(content)
        return response.status;
      }
    };
    let responseStatus = getResponseStatusAfterLoggedIn();
    expect(responseStatus).toBe(200)
  })
})