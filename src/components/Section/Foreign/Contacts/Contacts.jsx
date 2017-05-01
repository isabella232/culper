import React from 'react'
import { i18n } from '../../../../config'
import { ForeignContactsValidator } from '../../../../validators'
import { ValidationElement, Branch, Show, Accordion } from '../../../Form'
import ForeignNational from './ForeignNational'

export default class Contacts extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      HasForeignContacts: props.HasForeignContacts,
      List: props.List,
      error: false,
      valid: false,
      errorCodes: []
    }

    this.updateHasForeignContacts = this.updateHasForeignContacts.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  onUpdate (name, value) {
    this.setState({ [name]: value }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          HasForeignContacts: this.state.HasForeignContacts,
          List: this.state.List
        })
      }
    })
  }

  updateHasForeignContacts (value) {
    this.onUpdate('HasForeignContacts', value)
  }

  updateList (items) {
    this.onUpdate('List', items)
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status, error) {
    if (!event) {
      return
    }

    let codes = super.mergeError(this.state.errorCodes, super.flattenObject(error))
    let complexStatus = null
    if (codes.length > 0) {
      complexStatus = false
    } else if (this.isValid()) {
      complexStatus = true
    }

    this.setState({error: complexStatus === false, valid: complexStatus === true, errorCodes: codes}, () => {
      const e = { [this.props.name]: codes }
      const s = { [this.props.name]: { status: complexStatus } }
      super.handleValidation(event, s, e)
    })
  }

  isValid () {
    return new ForeignContactsValidator(this.state, null).isValid()
  }

  summary (item, index) {
    return ''
  }

  render () {
    return (
      <div className="foreign-contacts">
        <Branch name="has_foreign_contacts"
                title={i18n.t('foreign.contacts.title')}
                help="foreign.contacts.branch.help"
                value={this.state.HasForeignContacts}
                onUpdate={this.updateHasForeignContacts}
                onValidate={this.handleValidation}
                />
        <Show when={this.state.HasForeignContacts === 'Yes'}>
          <Accordion minimum="1"
                     items={this.state.List}
                     onUpdate={this.updateList}
                     onValidate={this.handleValidation}
                     summary={this.summary}
                     description={i18n.t('foreign.contacts.collection.summary.title')}
                     appendLabel={i18n.t('foreign.contacts.collection.append')}>
            <ForeignNational name="Item" bind={true} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Contacts.defaultProps = {
  HasForeignContacts: '',
  List: []
}
