import { validateModel } from 'models/validate'
import foreignBusinessContact from '../foreignBusinessContact'

describe('The foreignBusinessContact model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Name.presence.REQUIRED',
      'Location.presence.REQUIRED',
      'Date.presence.REQUIRED',
      'Governments.presence.REQUIRED',
      'Establishment.presence.REQUIRED',
      'Representatives.presence.REQUIRED',
      'Purpose.presence.REQUIRED',
      'SubsequentContacts.presence.REQUIRED',
    ]
    expect(validateModel(testData, foreignBusinessContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Name must be a valid name', () => {
    const testData = {
      Name: 'Persons Name',
    }
    const expectedErrors = [
      'Name.model.first.presence.REQUIRED',
      'Name.model.middle.presence.REQUIRED',
      'Name.model.last.presence.REQUIRED',
    ]
    expect(validateModel(testData, foreignBusinessContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Location must be a valid location', () => {
    const testData = {
      Location: 'Place',
    }
    const expectedErrors = [
      'Location.location.city.presence.REQUIRED',
      'Location.location.country.presence.REQUIRED',
    ]

    expect(validateModel(testData, foreignBusinessContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Date must be a valid date', () => {
    const testData = {
      Date: 'invalid date',
    }
    const expectedErrors = [
      'Date.date.day.presence.REQUIRED',
      'Date.date.month.presence.REQUIRED',
      'Date.date.year.presence.REQUIRED',
    ]

    expect(validateModel(testData, foreignBusinessContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Date cannot be before applicant birthdate', () => {
    const applicantBirthdate = { month: 1, day: 2, year: 1980 }
    const testData = {
      Date: { month: 1, year: 1970, day: 2 },
    }

    const expectedErrors = [
      'Date.date.date.datetime.DATE_TOO_EARLY',
    ]

    expect(validateModel(testData, foreignBusinessContact, {
      applicantBirthdate,
    }))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Date cannot be in the future', () => {
    const testData = {
      Date: { month: 1, year: 2050, day: 2 },
    }

    const expectedErrors = [
      'Date.date.date.datetime.DATE_TOO_LATE',
    ]

    expect(validateModel(testData, foreignBusinessContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Governments must have at least one value', () => {
    const testData = {
      Governments: { value: [] },
    }
    const expectedErrors = ['Governments.country.INVALID_COUNTRY']
    expect(validateModel(testData, foreignBusinessContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Governments must have valid values', () => {
    const testData = {
      Governments: { value: ['United Kingdom', 'Germany', 'test'] },
    }
    const expectedErrors = ['Governments.country.INVALID_COUNTRY']
    expect(validateModel(testData, foreignBusinessContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Establishment must have a value', () => {
    const testData = {
      Establishment: { values: 'test' },
    }
    const expectedErrors = ['Establishment.hasValue.MISSING_VALUE']
    expect(validateModel(testData, foreignBusinessContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Representatives must have a value', () => {
    const testData = {
      Representatives: { values: 'test' },
    }
    const expectedErrors = ['Representatives.hasValue.MISSING_VALUE']
    expect(validateModel(testData, foreignBusinessContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Purpose must have a value', () => {
    const testData = {
      Purpose: { values: 'test' },
    }
    const expectedErrors = ['Purpose.hasValue.MISSING_VALUE']
    expect(validateModel(testData, foreignBusinessContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('SubsequentContacts must be a valid branch collection', () => {
    const testData = {
      SubsequentContacts: {
        items: [
          {
            Item: { Has: { value: 'Yes' }, Subsequent: '', Recent: true },
          },
          {
            Item: { Has: { value: 'No' } },
          },
        ],
      },
    }
    const expectedErrors = [
      'SubsequentContacts.branchCollection.0.Subsequent.presence.REQUIRED',
    ]

    expect(validateModel(testData, foreignBusinessContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('SubsequentContact Recent cannot be before applicant birthdate', () => {
    const applicantBirthdate = { month: 1, day: 2, year: 1980 }
    const testData = {
      SubsequentContacts: {
        items: [
          {
            Item: {
              Has: { value: 'Yes' },
              Subsequent: '',
              Recent: { month: 1, year: 1970, day: 2 },
            },
          },
          {
            Item: { Has: { value: 'No' } },
          },
        ],
      },
    }

    const expectedErrors = [
      'SubsequentContacts.branchCollection.0.Recent.date.date.datetime.DATE_TOO_EARLY',
    ]

    expect(validateModel(testData, foreignBusinessContact, {
      applicantBirthdate,
    }))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('SubsequentContact Recent cannot be in the future', () => {
    const testData = {
      SubsequentContacts: {
        items: [
          {
            Item: {
              Has: { value: 'Yes' },
              Subsequent: '',
              Recent: { month: 1, year: 2050, day: 2 },
            },
          },
          {
            Item: { Has: { value: 'No' } },
          },
        ],
      },
    }

    const expectedErrors = [
      'SubsequentContacts.branchCollection.0.Recent.date.date.datetime.DATE_TOO_LATE',
    ]

    expect(validateModel(testData, foreignBusinessContact))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid foreign business contact', () => {
    const testData = {
      Name: { first: 'My', middle: 'Foreign', last: 'Friend' },
      Location: { city: 'Paris', country: 'France' },
      Date: { year: 2010, month: 2, day: 4 },
      Governments: { value: ['France'] },
      Establishment: { value: 'Test' },
      Representatives: { value: 'Testing' },
      Purpose: { value: 'Because' },
      SubsequentContacts: {
        items: [
          {
            Item: {
              Has: { value: 'Yes' },
              Subsequent: { value: 'Friendship' },
              Recent: { year: 2015, month: 2, day: 10 },
              Future: { value: 'Hanging out' },
            },
          },
          {
            Item: { Has: { value: 'No' } },
          },
        ],
      },
    }
    expect(validateModel(testData, foreignBusinessContact)).toEqual(true)
  })
})
