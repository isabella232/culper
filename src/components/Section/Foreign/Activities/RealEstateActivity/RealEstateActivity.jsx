import React from 'react'
import { i18n } from '../../../../../config'
import { AddressSummary } from '../../../../Summary'
import { Accordion, Branch, Show } from '../../../../Form'
import { ForeignRealEstateActivityValidator } from '../../../../../validators'
import SubsectionElement from '../../../SubsectionElement'
import RealEstateInterest from './RealEstateInterest'

export default class RealEstateActivity extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateHasInterests = this.updateHasInterests.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      ListBranch: this.props.ListBranch,
      HasInterests: this.props.HasInterests,
      ...queue
    })
  }

  updateList (values) {
    this.update({
      List: values.items,
      ListBranch: values.branch
    })
  }

  updateHasInterests (values) {
    this.update({
      HasInterests: values,
      List: values === 'Yes' ? this.props.List : [],
      ListBranch: values === 'Yes' ? this.props.ListBranch : ''
    })
  }

  summary (item, index) {
    const o = (item || {}).RealEstateInterest || {}
    const who = (o.InterestTypes || []).join(', ')
    const acquired = (o.Acquired || {}).date ? `${o.Acquired.month}/${o.Acquired.year}` : ''
    const address = AddressSummary(o.Address, '')
    const type = i18n.t('foreign.activities.realestate.collection.itemType')

    const summary = [who, address].reduce((prev, next) => {
      if (prev && next) {
        return <span>{prev} - {next}</span>
      }
      return prev
    })

    return (
      <span className="content">
        <span className="index">{type} {index + 1}:</span>
        <span className="interest">
          <strong>{summary || i18n.m('foreign.activities.realestate.collection.summary')}</strong>
        </span>
        <span className="acquired">{acquired}</span>
      </span>
    )
  }

  render () {
    return (
      <div className="realestate">
        <Branch name="has_interests"
                label={i18n.t('foreign.activities.realestate.heading.title')}
                labelSize="h3"
                value={this.props.HasInterests}
                warning={true}
                onError={this.handleError}
                onUpdate={this.updateHasInterests}>
        </Branch>

        <Show when={this.props.HasInterests === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     items={this.props.List}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     description={i18n.t('foreign.activities.realestate.collection.description')}
                     appendTitle={i18n.t('foreign.activities.realestate.collection.appendTitle')}
                     appendLabel={i18n.t('foreign.activities.realestate.collection.appendLabel')}>
            <RealEstateInterest name="RealEstateInterest"
                                bind={true}
                                />
          </Accordion>
        </Show>
      </div>
    )
  }
}

RealEstateActivity.defaultProps = {
  name: 'realestate',
  HasInterests: '',
  List: [],
  ListBranch: '',
  defaultState: true,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'activities/realestate',
  dispatch: () => {},
  validator: (state, props) => {
    return new ForeignRealEstateActivityValidator(state, props).isValid()
  }
}
