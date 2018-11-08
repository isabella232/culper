import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { i18n } from '../../../config'
import Field from '../Field'
import Branch from '../Branch'
import Show from '../Show'
import Location from './Location'
import LocationValidator, { countryString } from '../../../validators/location'
import ValidationElement from '../ValidationElement'
import alternateAddress from '../../../schema/form/alternateaddress'

const alternateAddressDefaultState = alternateAddress
const propTypes = {
  address: PropTypes.object,
  belongingTo: PropTypes.string,
  country: PropTypes.string,
  onUpdate: PropTypes.func
}

class AlternateAddress extends ValidationElement {
  constructor(props) {
    super(props)

    this.handleUpdate = this.handleUpdate.bind(this);
    this.setAlternateAddress = this.setAlternateAddress.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (!this.isSameCountry(prevProps.country) && !this.isForeignAddress()) {
      this.props.onUpdate(this.prepareUpdate(alternateAddressDefaultState()))
    }
  }

  prepareUpdate(toUpdate = {}) {
    return {
      [this.props.belongingTo]: {
        ...this.props.address,
        ...toUpdate
      }
    }
  }

  handleUpdate(values) {
    this.props.onUpdate(
      this.prepareUpdate({
        Address: values
      })
    )
  }

  setAlternateAddress(values) {
    this.props.onUpdate(
      this.prepareUpdate({
        HasDifferentAddress: values
      })
    )
  }

  isForeignMilitaryAddress() {
    const { address: { HasDifferentAddress } } = this.props
    return HasDifferentAddress.value === 'Yes' && this.isForeignAddress()
  }

  isMilitaryAddress() {
    return countryString(this.props.country) === 'POSTOFFICE'
  }

  isForeignAddress() {
    if (this.props.forceAPO) {
      return true;
    }

    const country = countryString(this.props.country);

    return country !== null &&
      country !== undefined &&
      country !== 'POSTOFFICE' &&
      country !== 'United States'
  }

  isSameCountry(comparedCountry) {
    return countryString(comparedCountry) === countryString(this.props.country)
  }

  prepareProps(extraProps = {}) {
    const defaults = {
      ...this.props.addressFieldMetadata,
      ...this.props.address.Address,
      label: i18n.t('address.label'),
      onUpdate: this.handleUpdate,
      required: true
    }

    return {
      ...defaults,
      ...extraProps
    }
  }

  render() {
    return (
      <div>
        <Show when={this.props.forceAPO || this.isForeignAddress()}>
          <Branch
            label={this.props.militaryAddressLabel}
            labelSize="h3"
            onUpdate={this.setAlternateAddress}
            value={this.props.address.HasDifferentAddress.value}
          />
        </Show>
        {/* 
          * This next block is a bit confusing. It renders when the user has indicated
          * that the associated address is in a foreign country AND has selected 'Yes'
          * in the preceeding <Branch/> component, indicating that they (or someone they knew)
          * had an APO/FPO (military) address in the foreign country
        */}
        <Show when={this.isForeignMilitaryAddress()}>
          <Field title={i18n.t('address.physicalLocationRequired')}>
            <Location
              {...this.prepareProps({
                country: 'POSTOFFICE',
                disableToggle: true,
                layout: Location.US_ADDRESS
              })}
            />
          </Field>
        </Show>
        <Show when={this.isMilitaryAddress()}>
          <Field title={i18n.t('address.physicalLocationRequired')}>
            <Location
              {...this.prepareProps({
                addressBook: this.props.addressBook,
                addressBooks: this.props.addressBooks,
                geocode: true,
                layout: this.props.layout
              })}
            />
          </Field>
        </Show>
      </div>
    )
  }
}

AlternateAddress.propTypes = propTypes
AlternateAddress.defaultProps = {
  addressFieldMetadata: {
    streetLabel: i18n.t('address.us.street.label'),
    streetPlaceholder: i18n.t('address.us.street.placeholder'),
    street2Label: i18n.t('address.us.street2.label'),
    stateLabel: i18n.t('address.us.state.label'),
    cityLabel: i18n.t('address.us.city.label'),
    zipcodeLabel: i18n.t('address.us.zipcode.label'),
    countyLabel: i18n.t('address.us.county.label'),
    countryLabel: i18n.t('address.international.country.label'),
  },
  forceAPO: false,
  layout: Location.ADDRESS,
  militaryAddressLabel: i18n.t('address.militaryAddress.me'),
}

const mapStateToProps = ({ application }, ownProps) => {
  const address = ownProps.address || alternateAddressDefaultState()

  return {
    address,
    addressBooks: application.AddressBooks,
  }
}

export { AlternateAddress }
export default connect(mapStateToProps)(AlternateAddress)
