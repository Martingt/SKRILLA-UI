import * as React from 'react'
import {mount} from 'enzyme'
import IndexPage from '../pages/index'

describe('Pages', () => {
  describe('Index', () => {
    it('has a div component that says Hello Next.js', function () {
      const wrap = mount(<IndexPage/>)
      expect(wrap.find('div').text()).toBe('Hello Next.js')
    })
  })  
})