import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import IndirectInterest from './IndirectInterest'

describe('The IndirectInterest component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <IndirectInterest {...expected} />
        </Provider>
      )
  })

  it('Renders without errors', () => {
    const component = createComponent()
    expect(component.find('.interest').length).toBe(1)
  })

  it('Performs updates', () => {
    let updates = 0
    // load interest types to test toggling since this is using all props
    const expected = {
      onUpdate: () => {
        updates++
      },
      InterestTypes: ['Yourself']
    }
    const component = createComponent(expected)
    expect(component.find('.interest').length).toBe(1)
    component
      .find({ name: 'interest-type', value: 'Yourself' })
      .simulate('change')
    component
      .find({ name: 'interest-type', value: 'Spouse' })
      .simulate('change')
    component.find('input[name="InterestType"]').simulate('change')
    component.find('input[name="Firstname"]').simulate('change')
    component.find('input[name="Lastname"]').simulate('change')
    component.find('textarea[name="Relationship"]').simulate('change')
    component
      .find('.acquired input[name="month"]')
      .simulate('change', { target: { value: '2' } })
    component
      .find('.acquired input[name="year"]')
      .simulate('change', { target: { value: '2010' } })
    component.find('textarea[name="HowAcquired"]').simulate('change')
    component.find('input[name="Cost"]').simulate('change')
    component.find('input[name="CostEstimated"]').simulate('change')
    component.find('input[name="ValueEstimated"]').simulate('change')
    component.find('input[name="Value"]').simulate('change')
    component
      .find('.sold input[name="month"]')
      .simulate('change', { target: { value: '2' } })
    component
      .find('.sold input[name="year"]')
      .simulate('change', { target: { value: '2010' } })
    component
      .find('.not-applicable input[name="SoldNotApplicable"]')
      .simulate('change')
    component.find('textarea[name="Explanation"]').simulate('change')
    component.find('.co-owners .branch .no input').simulate('change')
    expect(updates).toBe(18)
  })
})
