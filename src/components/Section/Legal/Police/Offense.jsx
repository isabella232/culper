import React from 'react'
import { i18n } from '../../../../config'
import Sentence from './Sentence'
import { ValidationElement, Branch, Show, Address, DateControl,
         Textarea, Text, RadioGroup, Radio, Svg, Field } from '../../../Form'

/**
 * Convenience function to send updates along their merry way
 */
const sendUpdate = (fn, name, props) => {
  if (fn) {
    fn({
      name: name,
      ...props
    })
  }
}

export default class Offense extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      Date: props.Date,
      Description: props.Description,
      InvolvedViolence: props.InvolvedViolence,
      InvolvedFirearms: props.InvolvedFirearms,
      InvolvedSubstances: props.InvolvedSubstances,
      Address: props.Address,
      WasCited: props.WasCited,
      CitedBy: props.CitedBy,
      AgencyAddress: props.AgencyAddress,
      WasCharged: props.WasCharged,
      Explanation: props.Explanation,
      CourtName: props.CourtName,
      CourtAddress: props.CourtAddress,
      CourtCharge: props.CourtCharge,
      CourtOutcome: props.CourtOutcome,
      CourtDate: props.CourtDate,
      ChargeType: props.ChargeType,
      WasSentenced: props.WasSentenced,
      Sentence: props.Sentence,
      AwaitingTrial: props.AwaitingTrial,
      AwaitingTrialExplanation: props.AwaitingTrialExplanation
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.updateDate = this.updateDate.bind(this)
    this.updateDescription = this.updateDescription.bind(this)
    this.updateInvolvedViolence = this.updateInvolvedViolence.bind(this)
    this.updateInvolvedFirearms = this.updateInvolvedFirearms.bind(this)
    this.updateInvolvedSubstances = this.updateInvolvedSubstances.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
    this.updateWasCited = this.updateWasCited.bind(this)
    this.updateCitedBy = this.updateCitedBy.bind(this)
    this.updateAgencyAddress = this.updateAgencyAddress.bind(this)
    this.updateWasCharged = this.updateWasCharged.bind(this)
    this.updateExplanation = this.updateExplanation.bind(this)
    this.updateCourtName = this.updateCourtName.bind(this)
    this.updateCourtAddress = this.updateCourtAddress.bind(this)
    this.updateChargeType = this.updateChargeType.bind(this)
    this.updateCourtCharge = this.updateCourtCharge.bind(this)
    this.updateCourtOutcome = this.updateCourtOutcome.bind(this)
    this.updateCourtDate = this.updateCourtDate.bind(this)
    this.updateWasSentenced = this.updateWasSentenced.bind(this)
    this.updateSentence = this.updateSentence.bind(this)
    this.updateAwaitingTrial = this.updateAwaitingTrial.bind(this)
    this.updateAwaitingTrialExplanation = this.updateAwaitingTrialExplanation.bind(this)
  }

  onUpdate (name, values) {
    this.setState({ [name]: values }, () => {
      sendUpdate(this.props.onUpdate, this.props.name, this.state)
    })
  }

  updateDate (values) {
    this.onUpdate('Date', values)
  }

  updateDescription (values) {
    this.onUpdate('Description', values)
  }

  updateInvolvedViolence (value, event) {
    this.onUpdate('InvolvedViolence', value)
  }

  updateInvolvedFirearms (value, event) {
    this.onUpdate('InvolvedFirearms', value)
  }

  updateInvolvedSubstances (value, event) {
    this.onUpdate('InvolvedSubstances', value)
  }

  updateAddress (value) {
    this.onUpdate('Address', value)
  }

  updateWasCited (value, event) {
    this.onUpdate('WasCited', value)
  }

  updateCitedBy (values) {
    this.onUpdate('CitedBy', values)
  }

  updateAgencyAddress (value) {
    this.onUpdate('AgencyAddress', value)
  }

  updateWasCharged (value, event) {
    this.onUpdate('WasCharged', value)
  }

  updateExplanation (values) {
    this.onUpdate('Explanation', values)
  }

  updateCourtName (value) {
    this.onUpdate('CourtName', value)
  }

  updateCourtAddress (value) {
    this.onUpdate('CourtAddress', value)
  }

  updateChargeType (event) {
    this.onUpdate('ChargeType', event.target.value)
  }

  updateCourtCharge (value) {
    this.onUpdate('CourtCharge', value)
  }

  updateCourtOutcome (value) {
    this.onUpdate('CourtOutcome', value)
  }

  updateCourtDate (value) {
    this.onUpdate('CourtDate', value)
  }

  updateWasSentenced (value, event) {
    this.onUpdate('WasSentenced', value)
  }

  updateSentence (value, event) {
    this.onUpdate('Sentence', value)
  }

  updateAwaitingTrial (values) {
    this.onUpdate('AwaitingTrial', values)
  }

  updateAwaitingTrialExplanation (values) {
    this.onUpdate('AwaitingTrialExplanation', values)
  }

  render () {
    return (
      <div className="offense">
        <Field title={i18n.t('legal.police.heading.date')}
               help="legal.police.help.date"
               adjustFor="labels"
               shrink={true}>
          <DateControl name="Date"
                       {...this.state.Date}
                       className="offense-date"
                       onUpdate={this.updateDate}
                       onError={this.props.onError}
                       />
        </Field>

        <Field title={i18n.t('legal.police.heading.description')}
               help="legal.police.help.description">
          <Textarea name="Description"
                    {...this.state.Description}
                    className="offense-description"
                    onUpdate={this.updateDescription}
                    onError={this.props.onError}
                    />
        </Field>

        <h3>{i18n.t('legal.police.heading.involvement')}</h3>
        <Branch name="involved_violence"
                adjustFor="p"
                className="offense-violence"
                value={this.state.InvolvedViolence}
                onUpdate={this.updateInvolvedViolence}
                onError={this.props.onError}>
          {i18n.m('legal.police.label.violence')}
        </Branch>

        <Branch name="involved_firearms"
                adjustFor="p"
                className="offense-firearms"
                value={this.state.InvolvedFirearms}
                onUpdate={this.updateInvolvedFirearms}
                onError={this.props.onError}>
          {i18n.m('legal.police.label.firearms')}
        </Branch>

        <Branch name="involved_substances"
                adjustFor="p"
                className="offense-substances"
                value={this.state.InvolvedSubstances}
                onUpdate={this.updateInvolvedSubstances}
                onError={this.props.onError}>
          {i18n.m('legal.police.label.substances')}
        </Branch>

        <Field title={i18n.t('legal.police.heading.address')}
               adjustFor="address"
               shrink={true}>
          <Address name="Address"
                   {...this.state.Address}
                   className="offense-address"
                   label={i18n.t('legal.police.label.address')}
                   onUpdate={this.updateAddress}
                   onError={this.props.onError}
                   />
        </Field>

        <h3>{i18n.t('legal.police.heading.cited')}</h3>
        <Branch name="was_cited"
                adjustFor="p"
                className="offense-cited"
                value={this.state.WasCited}
                onUpdate={this.updateWasCited}
                onError={this.props.onError}>
        </Branch>

        <Show when={this.state.WasCited === 'Yes'}>
          <div>
            <Field title={i18n.t('legal.police.heading.needmore')}
                   className="more title">
              <Svg src="/img/date-down-arrow.svg" className="more arrow" />
            </Field>

            <h2>{i18n.t('legal.police.heading.citedagency')}</h2>
            <Field title={i18n.t('legal.police.heading.citedby')}>
              <Text name="CitedBy"
                    {...this.state.CitedBy}
                    className="offense-citedby"
                    onUpdate={this.updateCitedBy}
                    onError={this.props.onError}
                    />
            </Field>

            <Field title={i18n.t('legal.police.heading.agencyaddress')}
                   help="legal.police.help.agencyaddress"
                   adjustFor="address"
                   shrink={true}>
              <Address name="AgencyAddress"
                       {...this.state.AgencyAddress}
                       className="offense-agencyaddress"
                       label={i18n.t('legal.police.label.address')}
                       onUpdate={this.updateAgencyAddress}
                       onError={this.props.onError}
                       />
            </Field>

            <h3>{i18n.t('legal.police.heading.charged')}</h3>
            <Branch name="was_charged"
                    className="offense-charged"
                    value={this.state.WasCharged}
                    onUpdate={this.updateWasCharged}
                    onError={this.props.onError}>
            </Branch>
          </div>
        </Show>

        <Show when={this.state.WasCharged === 'No'}>
          <div>
            <Field adjustFor="labels">
              <Textarea name="Explanation"
                        {...this.state.Explanation}
                        label={i18n.t('legal.police.label.explanation')}
                        className="offense-explanation"
                        onUpdate={this.updateExplanation}
                        onError={this.props.onError}
                        />
            </Field>
          </div>
        </Show>

        <Show when={this.state.WasCharged === 'Yes'}>
          <div>
            <Field title={i18n.t('legal.police.heading.needmore')}
                   className="more title">
              <Svg src="/img/date-down-arrow.svg" className="more arrow" />
            </Field>

            <Field title={i18n.t('legal.police.heading.courtname')}
                   adjustFor="labels">
              <Text name="CourtName"
                    {...this.state.CourtName}
                    label={i18n.t('legal.police.label.courtname')}
                    className="offense-courtname"
                    onUpdate={this.updateCourtName}
                    onError={this.props.onError}
                    />
            </Field>

            <Field title={i18n.t('legal.police.heading.courtaddress')}
                   help="legal.police.help.courtaddress"
                   adjustFor="address"
                   shrink={true}>
              <Address name="CourtAddress"
                       {...this.state.CourtAddress}
                       label={i18n.t('legal.police.label.address')}
                       className="offense-courtaddress"
                       onUpdate={this.updateCourtAddress}
                       onError={this.props.onError}
                       />
            </Field>

            <h3>{i18n.t('legal.police.heading.chargedetails')}</h3>
            {i18n.m('legal.police.para.chargedetails')}
            <Field title={i18n.t('legal.police.heading.chargeType')}
                   titleSize="h4"
                   adjustFor="buttons"
                   shrink={true}>
              <RadioGroup className="offense-chargetype option-list"
                          selectedValue={this.state.ChargeType}>
                <Radio name="charge-felony"
                       className="charge-felony"
                       label={i18n.t('legal.police.label.felony')}
                       value="Felony"
                       onChange={this.updateChargeType}
                       onError={this.props.onError}
                       />
                <Radio name="charge-misdemeanor"
                       className="charge-misdemeanor"
                       label={i18n.t('legal.police.label.misdemeanor')}
                       value="Misdemeanor"
                       onChange={this.updateChargeType}
                       onError={this.props.onError}
                       />
                <Radio name="charge-other"
                       className="charge-other"
                       label={i18n.t('legal.police.label.other')}
                       value="Other"
                       onChange={this.updateChargeType}
                       onError={this.props.onError}
                       />
              </RadioGroup>

              <Text name="CourtCharge"
                    {...this.state.CourtCharge}
                    label={i18n.t('legal.police.label.courtcharge')}
                    className="offense-courtcharge"
                    onUpdate={this.updateCourtCharge}
                    onError={this.props.onError}
                    />
              <Text name="CourtOutcome"
                    {...this.state.CourtOutcome}
                    label={i18n.t('legal.police.label.courtoutcome')}
                    className="offense-courtoutcome"
                    onUpdate={this.updateCourtOutcome}
                    onError={this.props.onError}
                    />
            </Field>

            <Field title={i18n.t('legal.police.heading.courtdate')}
                   titleSize="h4"
                   help="legal.police.help.courtdate"
                   adjustFor="labels"
                   shrink={true}>
              <DateControl name="CourtDate"
                           {...this.state.CourtDate}
                           hideDay={true}
                           className="offense-courtdate"
                           onUpdate={this.updateCourtDate}
                           onError={this.props.onError}
                           />
            </Field>

            <h3>{i18n.t('legal.police.heading.sentenced')}</h3>
            <Branch name="was_sentenced"
                    className="offense-sentenced"
                    value={this.state.WasSentenced}
                    onUpdate={this.updateWasSentenced}
                    onError={this.props.onError}>
            </Branch>

            <Show when={this.state.WasSentenced === 'Yes'}>
              <div>
                <Field title={i18n.t('legal.police.heading.needmore')}
                       className="more title">
                  <Svg src="/img/date-down-arrow.svg" className="more arrow" />
                </Field>
                <Sentence name="Sentence"
                          {...this.state.Sentence}
                          onError={this.props.onError}
                          onUpdate={this.updateSentence}
                          />
              </div>
            </Show>

            <Show when={this.state.WasSentenced === 'No'}>
              <div>
                <Branch name="awaiting_trial"
                        label={i18n.t('legal.police.heading.awaitingTrial')}
                        labelSize="h4"
                        className="awaiting-trial"
                        value={this.state.AwaitingTrial}
                        onError={this.props.onError}
                        onUpdate={this.updateAwaitingTrial}
                        />
                <Field title={i18n.t('legal.police.heading.awaitingTrialExplanation')}
                       titleSize="label"
                       adjustFor="labels">
                  <Textarea className="awaiting-trial-explanation"
                            {...this.state.AwaitingTrialExplanation}
                            name="awaiting_trial_explanation"
                            onError={this.props.onError}
                            onUpdate={this.updateAwaitingTrialExplanation} />
                </Field>
              </div>
            </Show>
          </div>
        </Show>
      </div>
    )
  }
}

Offense.defaultProps = {
  onError: (value, arr) => { return arr }
}