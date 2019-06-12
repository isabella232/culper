import { validateModel } from 'models/validate'
import foreignPassportTravel from '../foreignPassportTravel'

describe('The foreignPassportTravel model', () => {
  it('Country is required', () => {
    const testData = {}
    const expectedErrors = ['Country.required']

    expect(validateModel(testData, foreignPassportTravel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Country must have a value', () => {
    const testData = { Country: 'Canada' }
    const expectedErrors = ['Country.hasValue']

    expect(validateModel(testData, foreignPassportTravel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Dates are required', () => {
    const testData = {}
    const expectedErrors = ['Dates.required']

    expect(validateModel(testData, foreignPassportTravel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Dates must be a valid date range', () => {
    const testData = {
      Dates: {
        from: { year: 2010, day: 2, month: 5 },
        to: { year: 2010, day: 1, month: 3 },
      },
    }
    const expectedErrors = ['Dates.daterange']

    expect(validateModel(testData, foreignPassportTravel))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid foreign passport travel', () => {
    const testData = {
      Country: { value: 'Germany' },
      Dates: {
        from: { year: 2010, day: 2, month: 5 },
        to: { year: 2010, day: 1, month: 6 },
      },
    }

    expect(validateModel(testData, foreignPassportTravel)).toEqual(true)
  })
})