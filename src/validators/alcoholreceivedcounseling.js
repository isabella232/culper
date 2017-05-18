import DateRangeValidator from './daterange'
import AddressValidator from './address'
import { validBranch, validGenericTextfield, validDateField } from './helpers'

export default class ReceivedCounselingsValidator {
  constructor (state, props) {
    this.receivedTreatment = state.ReceivedTreatment
    this.list = state.List
    this.listBranch = state.ListBranch
  }

  validReceivedTreatment () {
    return validBranch(this.receivedTreatment)
  }

  validReceivedCounselings () {
    if (this.validReceivedTreatment() && this.receivedTreatment === 'No') {
      return true
    }

    if (!this.list || !this.list.length) {
      return false
    }

    if (this.listBranch !== 'No') {
      return false
    }

    for (const item of this.list) {
      const result = new ReceivedCounselingValidator(item.ReceivedCounseling, null).isValid()
      if (!result) {
        return false
      }
    }

    return true
  }

  isValid () {
    return this.validReceivedTreatment() &&
      this.validReceivedCounselings()
  }
}

export class ReceivedCounselingValidator {
  constructor (state, props) {
    this.treatmentProviderName = state.TreatmentProviderName
    this.treatmentProviderAddress = state.TreatmentProviderAddress
    this.agencyName = state.AgencyName
    this.agencyAddress = state.AgencyAddress
    this.useSameAddress = state.UseSameAddress
    this.treatmentBeganDate = state.TreatmentBeganDate
    this.treatmentEndDate = state.TreatmentEndDate
    this.completedTreatment = state.CompletedTreatment
    this.noCompletedTreatmentExplanation = state.NoCompletedTreatmentExplanation
  }

  validCompletedTreatment () {
    switch (this.completedTreatment) {
      case 'Yes':
        return true
      case 'No':
        return validGenericTextfield(this.noCompletedTreatmentExplanation)
      default:
        return false
    }
  }

  validAddress () {
    if (this.useSameAddress === 'Yes') {
      return new AddressValidator(this.treatmentProviderAddress).isValid()
    }
    return new AddressValidator(this.treatmentProviderAddress).isValid() &&
      new AddressValidator(this.agencyAddress).isValid()
  }

  isValid () {
    return validGenericTextfield(this.treatmentProviderName) &&
      validBranch(this.useSameAddress) &&
      this.validAddress() &&
      validGenericTextfield(this.agencyName) &&
      this.validCompletedTreatment() &&
      validDateField(this.treatmentBeganDate) &&
      validDateField(this.treatmentEndDate)
  }
}
