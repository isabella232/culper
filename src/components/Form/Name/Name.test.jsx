import React from 'react'
import { mount } from 'enzyme'
import Name from './Name'

describe('The Name component', () => {
  const validatedElements = 18

  it('no error on empty', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      help: 'Helpful error message',
      value: ''
    }
    const component = mount(<Name name={expected.name} label={expected.label} help={expected.help} value={expected.value} />)
    component.find('input#' + expected.name + '-last').simulate('change')
    expect(component.find('span.hidden').length).toEqual(validatedElements)
  })

  it('handles last name patterns', () => {
    const expected = [
      {
        name: 'applicant-name',
        last: 'X- Mc. O\'Leary',
        valid: true
      },
      {
        name: 'applicant-numbers',
        last: 'abc 123',
        valid: false
      }
    ]

    expected.forEach((ex) => {
      const component = mount(<Name name={ex.name} last={ex.last} />)
      component.find('input#' + ex.name + '-last').simulate('change')
      // expect(component.find('span.hidden').length === component.find('span').length).toEqual(ex.valid)
      expect(component.find('span.hidden').length === validatedElements).toEqual(ex.valid)
    })
  })

  it('handles maximum lengths', () => {
    const expected = [
      {
        name: 'applicant-long-first',
        first: 'aaaaaaaaaabbbbbbbbbbccccccccccddddddddddeeeeeeeeeeffffffffffgggggggggghhhhhhhhhhiiiiiiiiiijjjjjjjjjjkkkkkkkkkk',
        part: 'first',
        valid: false
      },
      {
        name: 'applicant-long-last',
        last: 'aaaaaaaaaabbbbbbbbbbccccccccccddddddddddeeeeeeeeeeffffffffffgggggggggghhhhhhhhhhiiiiiiiiiijjjjjjjjjjkkkkkkkkkk',
        part: 'last',
        valid: false
      },
      {
        name: 'applicant-long-middle',
        middle: 'aaaaaaaaaabbbbbbbbbbccccccccccddddddddddeeeeeeeeeeffffffffffgggggggggghhhhhhhhhhiiiiiiiiiijjjjjjjjjjkkkkkkkkkk',
        part: 'middle',
        valid: false
      }
    ]

    expected.forEach((ex) => {
      const component = mount(<Name name={ex.name} first={ex.first} last={ex.last} middle={ex.middle} />)
      component.find('input#' + ex.name + '-' + ex.part).simulate('change')
      expect(component.find('span.hidden').length === component.find('span').length).toEqual(ex.valid)
    })
  })

  it('bubbles up validate event', () => {
    let validations = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      help: 'Helpful error message',
      error: true,
      focus: false,
      valid: false,
      handleValidation: function (event) {
        validations++
      }
    }
    const component = mount(<Name name={expected.name} onValidate={expected.handleValidation} />)
    component.find('input').first().simulate('change')
    expect(validations > 0).toEqual(true)
  })

  it('bubbles up change event', () => {
    let changes = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      help: 'Helpful error message',
      error: true,
      focus: false,
      valid: false,
      handleChange: function (event) {
        changes++
      }
    }
    const component = mount(<Name name={expected.name} onChange={expected.handleChange} />)
    component.find('input').first().simulate('change')
    expect(changes).toEqual(1)
  })

  it('bubbles up focus event', () => {
    let foci = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      help: 'Helpful error message',
      error: true,
      focus: false,
      valid: false,
      handleFocus: function (event) {
        foci++
      }
    }
    const component = mount(<Name name={expected.name} onFocus={expected.handleFocus} />)
    component.find('input').first().simulate('focus')
    expect(foci).toEqual(1)
  })

  it('bubbles up blur event', () => {
    let blurs = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      help: 'Helpful error message',
      error: true,
      focus: false,
      valid: false,
      handleBlur: function (event) {
        blurs++
      }
    }
    const component = mount(<Name name={expected.name} onBlur={expected.handleBlur} />)
    component.find('input').first().simulate('blur')
    expect(blurs).toEqual(1)
  })
})