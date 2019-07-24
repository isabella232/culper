import { validateModel } from 'models/validate'
import financialBankruptcy from '../financialBankruptcy'

describe('The financial bankruptcy model', () => {
  it('has required fields', () => {
    const testData = {
      DateDischargedNotApplicable: {
        applicable: true,
      },
    }
    const expectedErrors = [
      'PetitionType.required',
      'CourtAddress.required',
      'CourtInvolved.required',
      'CourtNumber.required',
      'TotalAmount.required',
      'DateFiled.required',
      'NameDebt.required',
      'DateDischarged.required',
      'HasDischargeExplanation.required',
      'DischargeExplanation.required',
    ]

    expect(validateModel(testData, financialBankruptcy))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('requires a valid PetitionType', () => {
    const testData = {
      DateDischargedNotApplicable: {
        applicable: true,
      },
      PetitionType: {
        value: 'InvalidType',
      },
    }

    const expectedErrors = ['PetitionType.hasValue']

    expect(validateModel(testData, financialBankruptcy))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('requires a DateDischarged if applicable', () => {
    const testData = {
      DateDischargedNotApplicable: {
        applicable: true,
      },
    }

    const expectedErrors = ['DateDischarged.required']

    expect(validateModel(testData, financialBankruptcy))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('DateDischarged must be after DateFiled', () => {
    const testData = {
      DateFiled: { month: 2, year: 2001 },
      DateDischarged: { month: 1, year: 2001 },
    }

    const expectedErrors = ['DateDischarged.date']

    expect(validateModel(testData, financialBankruptcy))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if PetitionType is Chapter13', () => {
    it('requires a Trustee', () => {
      const testData = {
        PetitionType: {
          value: 'Chapter13',
        },
      }

      const expectedErrors = ['Trustee.required']

      expect(validateModel(testData, financialBankruptcy))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('requires a TrusteeAddress', () => {
      const testData = {
        PetitionType: {
          value: 'Chapter13',
        },
      }

      const expectedErrors = ['TrusteeAddress.required']

      expect(validateModel(testData, financialBankruptcy))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})