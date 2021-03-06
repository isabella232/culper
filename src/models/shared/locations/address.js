import locationModel from '../location'

const locationAddress = {
  street: locationModel.street,
  street2: {
    ...locationModel.street,
    presence: false,
  },
  city: locationModel.city,
  state: locationModel.state,
  zipcode: locationModel.zipcode,
  country: locationModel.country,
}

export default locationAddress
