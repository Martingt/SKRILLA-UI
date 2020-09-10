import * as React from 'react'
import {mount} from 'enzyme'
import IndexPage from '../pages/index'

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