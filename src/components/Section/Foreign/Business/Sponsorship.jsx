import React from 'react'
import { i18n } from 'config'
import { Summary, NameSummary, DateSummary } from 'components/Summary'
import { Branch, Show, Accordion } from 'components/Form'
import { FOREIGN, FOREIGN_BUSINESS_SPONSORSHIP } from 'config/formSections/foreign'
import Subsection from 'components/Section/shared/Subsection'
import connectSubsection from 'components/Section/shared/SubsectionConnector'
import SponsorshipItem from './SponsorshipItem'

const sectionConfig = {
  key: FOREIGN_BUSINESS_SPONSORSHIP.key,
  section: FOREIGN.name,
  store: FOREIGN.store,
  subsection: FOREIGN_BUSINESS_SPONSORSHIP.name,
  storeKey: FOREIGN_BUSINESS_SPONSORSHIP.storeKey,
}

export class Sponsorship extends Subsection {
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

  update = (queue) => {
    this.props.onUpdate(this.storeKey, {
      List: this.props.List,
      HasForeignSponsorship: this.props.HasForeignSponsorship,
      ...queue,
    })
  }

  updateHasForeignSponsorship = (values) => {
    this.update({
      HasForeignSponsorship: values,
      List: values.value === 'Yes'
        ? this.props.List
        : { items: [], branch: {} },
    })
  }

  updateList = (values) => {
    this.update({
      List: values,
    })
  }

  summary = (item, index) => {
    const obj = (item && item.Item) || {}
    const dates = DateSummary(obj.Dates)
    const name = NameSummary(obj.Name)

    return Summary({
      type: i18n.t('foreign.business.sponsorship.collection.summary.item'),
      index,
      left: name,
      right: dates,
      placeholder: i18n.t('foreign.business.sponsorship.collection.summary.unknown'),
    })
  }

  render() {
    const { errors } = this.props
    const accordionErrors = errors && errors.filter(e => e.indexOf('List.accordion') === 0)

    return (
      <div
        className="section-content foreign-business-sponsorship"
        data-section={FOREIGN.key}
        data-subsection={FOREIGN_BUSINESS_SPONSORSHIP.key}
      >
        <h1 className="section-header">{i18n.t('foreign.subsection.business.sponsorship')}</h1>
        <Branch
          name="has_foreign_sponsorship"
          label={i18n.t('foreign.business.sponsorship.heading.title')}
          labelSize="h4"
          help="foreign.business.sponsorship.help.branch"
          {...this.props.HasForeignSponsorship}
          warning={true}
          onUpdate={this.updateHasForeignSponsorship}
          required={this.props.required}
          onError={this.handleError}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.HasForeignSponsorship.value === 'Yes'}>
          <Accordion
            {...this.props.List}
            defaultState={this.props.defaultState}
            scrollToBottom={this.props.scrollToBottom}
            onUpdate={this.updateList}
            onError={this.handleError}
            errors={accordionErrors}
            summary={this.summary}
            description={i18n.t('foreign.business.sponsorship.collection.summary.title')}
            appendTitle={i18n.t('foreign.business.sponsorship.collection.appendTitle')}
            appendLabel={i18n.t('foreign.business.sponsorship.collection.append')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <SponsorshipItem
              applicantBirthdate={this.props.applicantBirthdate}
              name="Item"
              bind={true}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Sponsorship.defaultProps = {
  name: 'Sponsorship',
  HasForeignSponsorship: {},
  List: {},
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'foreign',
  subsection: 'business/sponsorship',
  addressBooks: {},
  dispatch: () => {},
  defaultState: true,
  scrollToBottom: '',
  errors: [],
}

export default connectSubsection(Sponsorship, sectionConfig)
