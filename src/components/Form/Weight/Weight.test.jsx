import React from 'react'
import { mount } from 'enzyme'
import Weight from './Weight'

describe('The Weight component', () => {
  it('no error on empty', () => {
    let blur = 0
    let focus = 0

    const expected = {
      name: 'input-focus',
      label: 'Pounds',
      value: '10',
      onBlur: () => { blur++ },
      onFocus: () => { focus++ }
    }
    const component = mount(<Weight name={expected.name} label={expected.label} value={expected.value} onBlur={expected.onBlur} onFocus={expected.onFocus} />)

    component.find('.pounds input').simulate('change')
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('.pounds input').length).toEqual(1)
    expect(component.find('.usa-input-error-label').length).toEqual(0)

    component.find('.pounds input').simulate('focus')
    component.find('.pounds input').simulate('blur')
    expect(blur).toBe(1)
    expect(focus).toBe(1)
  })
})
