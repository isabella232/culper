import React from 'react'
import { i18n } from 'config'
import schema from 'schema'
import validate, { AdviceValidator } from 'validators'
import { Summary, NameSummary } from 'components/Summary'
import { Branch, Show, Accordion } from 'components/Form'
import { FOREIGN, FOREIGN_BUSINESS_ADVICE } from 'config/formSections/foreign'
import Subsection from 'components/Section/shared/Subsection'
import connectForeignSection from '../ForeignConnector'
import AdviceItem from './AdviceItem'

const sectionConfig = {
  section: FOREIGN.name,
  store: FOREIGN.store,
  subsection: FOREIGN_BUSINESS_ADVICE.name,
  storeKey: FOREIGN_BUSINESS_ADVICE.storeKey,
}
export class Advice extends Subsection {
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
      HasForeignAdvice: this.props.HasForeignAdvice,
      ...queue,
    })
  }

  updateHasForeignAdvice = (values) => {
    this.update({
      HasForeignAdvice: values,
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
    const name = NameSummary(obj.Name)

    return Summary({
      type: i18n.t('foreign.business.advice.collection.summary.item'),
      index,
      left: name,
      right: null,
      placeholder: i18n.t('foreign.business.advice.collection.summary.unknown'),
    })
  }

  render() {
    return (
      <div
        className="section-content foreign-business-advice"
        {...super.dataAttributes()}
      >
        <h1 className="section-header">{i18n.t('foreign.destination.business.advice')}</h1>
        <Branch
          name="has_foreign_advice"
          label={i18n.t('foreign.business.advice.heading.title')}
          labelSize="h4"
          adjustFor="p"
          {...this.props.HasForeignAdvice}
          warning
          onUpdate={this.updateHasForeignAdvice}
          required={this.props.required}
          onError={this.handleError}
          scrollIntoView={this.props.scrollIntoView}
        >
          {i18n.m('foreign.business.advice.para.branch')}
        </Branch>

        <Show when={this.props.HasForeignAdvice.value === 'Yes'}>
          <Accordion
            {...this.props.List}
            defaultState={this.props.defaultState}
            scrollToBottom={this.props.scrollToBottom}
            onUpdate={this.updateList}
            onError={this.handleError}
            validator={AdviceValidator}
            summary={this.summary}
            description={i18n.t('foreign.business.advice.collection.summary.title')}
            appendTitle={i18n.t('foreign.business.advice.collection.appendTitle')}
            appendMessage={i18n.m('foreign.business.advice.collection.appendMessage')}
            appendLabel={i18n.t('foreign.business.advice.collection.append')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <AdviceItem
              name="Item"
              bind
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Advice.defaultProps = {
  name: 'Advice',
  HasForeignAdvice: {},
  List: {},
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'foreign',
  subsection: 'business/advice',
  dispatch: () => {},
  validator: data => validate(schema('foreign.business.advice', data)),
  defaultState: true,
  scrollToBottom: '',
}

export default connectForeignSection(Advice, sectionConfig)
