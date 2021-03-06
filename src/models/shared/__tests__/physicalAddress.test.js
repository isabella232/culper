import { validateModel } from 'models/validate'
import physicalAddress from '../physicalAddress'

describe('The PhysicalAddress model', () => {
  it('HasDifferentAddress is required', () => {
    const testData = {}
    const expectedErrors = ['HasDifferentAddress.presence.REQUIRED']
    expect(validateModel(testData, physicalAddress))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasDifferentAddress must have a value', () => {
    const testData = {
      HasDifferentAddress: '',
    }
    const expectedErrors = ['HasDifferentAddress.hasValue.MISSING_VALUE']
    expect(validateModel(testData, physicalAddress))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasDifferentAddress value must be valid', () => {
    const testData = {
      HasDifferentAddress: {
        value: 'Nope',
      },
    }
    const expectedErrors = ['HasDifferentAddress.hasValue.value.inclusion.INCLUSION']
    expect(validateModel(testData, physicalAddress))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('with HasDifferentAddress.value set to "No"', () => {
    it('Address is not required', () => {
      const testData = {
        HasDifferentAddress: { value: 'No' },
      }

      const expectedErrors = ['Address.presence.REQUIRED']
      expect(validateModel(testData, physicalAddress))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Telephone is not required', () => {
      const testData = {
        HasDifferentAddress: { value: 'No' },
      }

      const expectedErrors = ['Telephone.presence.REQUIRED']
      expect(validateModel(testData, physicalAddress))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid physical address', () => {
      const testData = {
        HasDifferentAddress: { value: 'No' },
      }

      expect(validateModel(testData, physicalAddress)).toBe(true)
    })
  })

  describe('with HasDifferentAddress.value set to "Yes"', () => {
    it('Address is required', () => {
      const testData = {
        HasDifferentAddress: { value: 'Yes' },
      }

      const expectedErrors = ['Address.presence.REQUIRED']
      expect(validateModel(testData, physicalAddress))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Address must be a valid address', () => {
      const testData = {
        HasDifferentAddress: { value: 'Yes' },
        Address: {
          test: 'blah',
        },
      }

      const expectedErrors = [
        'Address.location.street.presence.REQUIRED',
        'Address.location.city.presence.REQUIRED',
        'Address.location.country.presence.REQUIRED',
      ]
      expect(validateModel(testData, physicalAddress))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Telephone is not required', () => {
      const testData = {
        HasDifferentAddress: { value: 'Yes' },
      }

      const expectedErrors = [
        'Telephone.presence.REQUIRED',
      ]
      expect(validateModel(testData, physicalAddress))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Telephone must have a number', () => {
      const testData = {
        HasDifferentAddress: { value: 'Yes' },
        Telephone: { noNumber: true },
      }

      const expectedErrors = [
        'Telephone.model.noNumber.inclusion.INCLUSION',
      ]
      expect(validateModel(testData, physicalAddress, { hasTelephone: true }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid physical address', () => {
      const testData = {
        HasDifferentAddress: { value: 'Yes' },
        Address: {
          street: '123 Main ST',
          city: 'New York',
          state: 'NY',
          zipcode: '10003',
          country: 'United States',
        },
        Telephone: {
          number: '1234567890',
          type: 'Domestic',
          timeOfDay: 'Both',
        },
      }

      expect(validateModel(testData, physicalAddress)).toBe(true)
    })
  })

  describe('with the "militaryAddress" option set to true', () => {
    it('Address must be a military address', () => {
      const testData = {
        HasDifferentAddress: { value: 'Yes' },
        Address: {
          street: '123 Main ST',
          city: 'New York',
          state: 'NY',
          zipcode: '10003',
          country: 'United States',
        },
      }

      const expectedErrors = ['Address.location.country.inclusion.INCLUSION']

      expect(validateModel(testData, physicalAddress, { militaryAddress: true }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid address', () => {
      const testData = {
        HasDifferentAddress: { value: 'Yes' },
        Address: {
          street: '123 Main ST',
          city: 'FPO',
          state: 'AA',
          zipcode: '34035',
          country: 'POSTOFFICE',
        },
      }

      expect(validateModel(testData, physicalAddress, { militaryAddress: true }))
        .toEqual(true)
    })
  })

  describe('with the "militaryAddress" option set to false', () => {
    it('HasDifferentAddress is not required', () => {
      const testData = {}
      const expectedErrors = ['HasDifferentAddress.required']
      expect(validateModel(testData, physicalAddress, { militaryAddress: false }))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Address must not be a military address', () => {
      const testData = {
        Address: {
          street: '123 Main ST',
          city: 'FPO',
          state: 'AA',
          zipcode: '34035',
          country: 'POSTOFFICE',
        },
      }

      const expectedErrors = ['Address.location.country.exclusion.EXCLUSION']

      expect(validateModel(testData, physicalAddress, { militaryAddress: false }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid address', () => {
      const testData = {
        Address: {
          street: '123 Main ST',
          city: 'New York',
          state: 'NY',
          zipcode: '10003',
          country: 'United States',
        },
      }

      expect(validateModel(testData, physicalAddress, { militaryAddress: false }))
        .toEqual(true)
    })
  })

  describe('with hasTelephone option', () => {
    it('errors without a telephone number', () => {
      const options = { hasTelephone: true }
      const testData = {
        HasDifferentAddress: { value: 'Yes' },
        Address: {
          street: '123 Main ST',
          city: 'New York',
          state: 'NY',
          zipcode: '10003',
          country: 'United States',
        },
        Telephone: {
          timeOfDay: '',
          type: '',
          numberType: '',
          number: '',
          extension: '',
          noNumber: false,
        },
      }
      const expectedErrors = [
        'Telephone.model.timeOfDay.presence.REQUIRED',
        'Telephone.model.type.inclusion.INCLUSION',
        'Telephone.model.number.presence.REQUIRED',
      ]
      expect(validateModel(testData, physicalAddress, options))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('without hasTelephone option', () => {
    it('does not have errors without a telephone number', () => {
      const options = { hasTelephone: false }
      const testData = {
        HasDifferentAddress: { value: 'Yes' },
        Address: {
          street: '123 Main ST',
          city: 'New York',
          state: 'NY',
          zipcode: '10003',
          country: 'United States',
        },
        Telephone: {
          timeOfDay: '',
          type: '',
          numberType: '',
          number: '',
          extension: '',
          noNumber: false,
        },
      }
      const expectedErrors = [
        'Telephone.model.timeOfDay.presence.REQUIRED',
        'Telephone.model.type.inclusion.INCLUSION',
        'Telephone.model.number.presence.REQUIRED',
      ]
      expect(validateModel(testData, physicalAddress, options))
        .toEqual(expect.not.arrayContaining(expectedErrors))
    })
  })
})
