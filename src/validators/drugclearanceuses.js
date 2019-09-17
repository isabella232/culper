import { validateModel, hasYesOrNo } from 'models/validate'
import drugClearanceUse from 'models/drugClearanceUse'

export const validateDrugClearanceUses = (data, formType, options = {}) => {
  const drugClearanceUsesModel = {
    UsedDrugs: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.UsedDrugs && attributes.UsedDrugs.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: drugClearanceUse },
        }
      }
      return {}
    },
  }

  return validateModel(data, drugClearanceUsesModel, options)
}
