import React from 'react'

import i18n from 'util/i18n'
import { Accordion, Branch, Show } from 'components/Form'
import { Summary, DateSummary } from 'components/Summary'

import {
  SUBSTANCE_USE,
  SUBSTANCE_USE_DRUGS_VOLUNTARY,
} from 'config/formSections/substanceUse'
import * as formConfig from 'config/forms'
import { getNumberOfYearsString } from 'helpers/text'

import Subsection from 'components/Section/shared/Subsection'
import connectSubsection from 'components/Section/shared/SubsectionConnector'
import VoluntaryTreatment from './VoluntaryTreatment'

const sectionConfig = {
  key: SUBSTANCE_USE_DRUGS_VOLUNTARY.key,
  section: SUBSTANCE_USE.name,
  store: SUBSTANCE_USE.store,
  subsection: SUBSTANCE_USE_DRUGS_VOLUNTARY.name,
  storeKey: SUBSTANCE_USE_DRUGS_VOLUNTARY.storeKey,
}

export class VoluntaryTreatments extends Subsection {
  constructor(props) {
    super(props)

    const {
      section, subsection, store, storeKey,
    } = sectionConfig

    this.section = section
    this.subsection = subsection
    this.store = store
    this.storeKey = storeKey
  }

  update = (updateValues) => {
    this.props.onUpdate(this.storeKey, {
      TreatmentVoluntary: this.props.TreatmentVoluntary,
      List: this.props.List,
      ...updateValues,
    })
  }

  updateList = (values) => {
    this.update({
      List: values,
    })
  }

  updateTreatmentVoluntary = (values) => {
    this.update({
      TreatmentVoluntary: values,
      List: values.value === 'Yes'
        ? this.props.List
        : { items: [], branch: {} },
    })
  }

  summary = (item, index) => {
    const o = (item || {}).Item || {}
    const range = DateSummary(o.TreatmentDates)
    const name = (o.TreatmentProvider || {}).value

    return Summary({
      type: i18n.t('substance.drugs.voluntary.collection.itemType'),
      index,
      left: name,
      right: range,
      placeholder: i18n.t('substance.drugs.voluntary.collection.summary'),
    })
  }

  render() {
    const { formType, errors } = this.props
    const formTypeConfig = formType && formConfig[formType]
    const years = formTypeConfig && formTypeConfig.SUBSTANCE_DRUG_TREATMENT_YEARS

    let branchLabelCopy
    let appendTitleCopy
    if (years === 'EVER') {
      branchLabelCopy = i18n.t('substance.drugs.heading.voluntaryTreatmentsEver')
      appendTitleCopy = i18n.t('substance.drugs.voluntary.collection.appendTitleEver')
    } else {
      const numberOfYearsString = getNumberOfYearsString(years)
      branchLabelCopy = i18n.t('substance.drugs.heading.voluntaryTreatments', { numberOfYearsString })
      appendTitleCopy = i18n.t('substance.drugs.voluntary.collection.appendTitle', { numberOfYearsString })
    }

    const accordionErrors = errors && errors.filter(e => e.indexOf('List.accordion') === 0)

    return (
      <div
        className="section-content voluntary-treatments"
        data-section={SUBSTANCE_USE.key}
        data-subsection={SUBSTANCE_USE_DRUGS_VOLUNTARY.key}
      >
        <h1 className="section-header">{i18n.t('substance.subsection.drugs.voluntary')}</h1>
        <Branch
          name="TreatmentVoluntary"
          label={branchLabelCopy}
          labelSize="h4"
          className="treatment-voluntary"
          {...this.props.TreatmentVoluntary}
          warning={true}
          onError={this.handleError}
          required={this.props.required}
          onUpdate={this.updateTreatmentVoluntary}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.TreatmentVoluntary.value === 'Yes'}>
          <Accordion
            defaultState={this.props.defaultState}
            {...this.props.List}
            scrollToBottom={this.props.scrollToBottom}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            errors={accordionErrors}
            description={i18n.t('substance.drugs.voluntary.collection.description')}
            appendTitle={appendTitleCopy}
            appendLabel={i18n.t('substance.drugs.voluntary.collection.appendLabel')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <VoluntaryTreatment
              name="Item"
              bind={true}
              addressBooks={this.props.addressBooks}
              dispatch={this.props.dispatch}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

VoluntaryTreatments.defaultProps = {
  TreatmentVoluntary: {},
  List: {},
  onError: (value, arr) => arr,
  section: 'substance',
  subsection: 'drugs/voluntary',
  addressBooks: {},
  dispatch: () => {},
  scrollToBottom: '',
  errors: [],
}

export default connectSubsection(VoluntaryTreatments, sectionConfig)
