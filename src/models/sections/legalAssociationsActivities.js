import { hasYesOrNo } from 'models/validate'
import activitiesOverthrow from 'models/activitiesOverthrow'

const legalAssociationActivitiesModel = {
  HasActivities: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.HasActivities && attributes.HasActivities.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: activitiesOverthrow },
      }
    }

    return {}
  },
}

export default legalAssociationActivitiesModel
