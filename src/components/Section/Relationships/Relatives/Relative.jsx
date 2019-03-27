import React from 'react'
import { i18n } from 'config'
import { pickDate, alphaNumericRegEx } from 'validators/helpers'
import {
  ValidationElement,
  Branch,
  Show,
  BranchCollection,
  Name,
  Text,
  Textarea,
  DateControl,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Country,
  Field,
  NotApplicable,
  Location,
} from 'components/Form'
import AlternateAddress from 'components/Form/Location/AlternateAddress'
import { RelativeValidator } from 'validators'
import { countryString } from 'validators/location'
import Alias from './Alias'

export default class Relative extends ValidationElement {
  getRelativeOptions = () => ([
    {
      name: 'relation-mother',
      label: i18n.m('relationships.relatives.label.relation.mother'),
      value: 'Mother',
      className: 'relation-mother',
    }, {
      name: 'relation-father',
      label: i18n.m('relationships.relatives.label.relation.father'),
      value: 'Father',
      className: 'relation-father',
    }, {
      name: 'relation-stepmother',
      label: i18n.m('relationships.relatives.label.relation.stepmother'),
      value: 'Stepmother',
      className: 'relation-stepmother',
    }, {
      name: 'relation-stepfather',
      label: i18n.m('relationships.relatives.label.relation.stepfather'),
      value: 'Stepfather',
      className: 'relation-stepfather',
    }, {
      name: 'relation-fosterparent',
      label: i18n.m('relationships.relatives.label.relation.fosterparent'),
      value: 'Fosterparent',
      className: 'relation-fosterparent',
    }, {
      name: 'relation-child',
      label: i18n.m('relationships.relatives.label.relation.child'),
      value: 'Child',
      className: 'relation-child',
    }, {
      name: 'relation-stepchild',
      label: i18n.m('relationships.relatives.label.relation.stepchild'),
      value: 'Stepchild',
      className: 'relation-stepchild',
    }, {
      name: 'relation-brother',
      label: i18n.m('relationships.relatives.label.relation.brother'),
      value: 'Brother',
      className: 'relation-brother',
    }, {
      name: 'relation-sister',
      label: i18n.m('relationships.relatives.label.relation.sister'),
      value: 'Sister',
      className: 'relation-sister',
    }, {
      name: 'relation-stepbrother',
      label: i18n.m('relationships.relatives.label.relation.stepbrother'),
      value: 'Stepbrother',
      className: 'relation-stepbrother',
    }, {
      name: 'relation-stepsister',
      label: i18n.m('relationships.relatives.label.relation.stepsister'),
      value: 'Stepsister',
      className: 'relation-stepsister',
    }, {
      name: 'relation-halfbrother',
      label: i18n.m('relationships.relatives.label.relation.halfbrother'),
      value: 'Half-brother',
      className: 'relation-halfbrother',
    }, {
      name: 'relation-halfsister',
      label: i18n.m('relationships.relatives.label.relation.halfsister'),
      value: 'Half-sister',
      className: 'relation-halfsister',
    }, {
      name: 'relation-fatherinlaw',
      label: i18n.m('relationships.relatives.label.relation.fatherinlaw'),
      value: 'Father-in-law',
      className: 'relation-fatherinlaw',
    }, {
      name: 'relation-motherinlaw',
      label: i18n.m('relationships.relatives.label.relation.motherinlaw'),
      value: 'Mother-in-law',
      className: 'relation-motherinlaw',
    }, {
      name: 'relation-guardian',
      label: i18n.m('relationships.relatives.label.relation.guardian'),
      value: 'Guardian',
      className: 'relation-guardian',
    },
  ])

  update = (queue) => {
    this.props.onUpdate({
      Relation: this.props.Relation,
      Name: this.props.Name,
      Birthdate: this.props.Birthdate,
      Birthplace: this.props.Birthplace,
      Citizenship: this.props.Citizenship,
      MaidenSameAsListed: this.props.MaidenSameAsListed,
      MaidenName: this.props.MaidenName,
      Aliases: this.props.Aliases,
      IsDeceased: this.props.IsDeceased,
      Address: this.props.Address,
      CitizenshipDocumentation: this.props.CitizenshipDocumentation,
      OtherCitizenshipDocumentation: this.props.OtherCitizenshipDocumentation,
      DocumentNumber: this.props.DocumentNumber,
      CourtName: this.props.CourtName,
      CourtAddress: this.props.CourtAddress,
      Document: this.props.Document,
      DocumentComments: this.props.DocumentComments,
      ResidenceDocumentNumber: this.props.ResidenceDocumentNumber,
      Expiration: this.props.Expiration,
      FirstContact: this.props.FirstContact,
      LastContact: this.props.LastContact,
      Methods: this.props.Methods,
      MethodsComments: this.props.MethodsComments,
      Frequency: this.props.Frequency,
      FrequencyComments: this.props.FrequencyComments,
      EmployerNotApplicable: this.props.EmployerNotApplicable,
      EmployerAddressNotApplicable: this.props.EmployerAddressNotApplicable,
      EmployerRelationshipNotApplicable: this.props.EmployerRelationshipNotApplicable,
      Employer: this.props.Employer,
      EmployerAddress: this.props.EmployerAddress,
      HasAffiliation: this.props.HasAffiliation,
      EmployerRelationship: this.props.EmployerRelationship,
      ...queue,
    })
  }

  updateField = (field, values) => {
    this.update({
      [field]: values,
    })
  }

  updateMethods = (values) => {
    const method = values.value
    const selected = [...((this.props.Methods || {}).values || [])]

    if (selected.includes(method)) {
      // Remove the relation if it was previously selected
      selected.splice(selected.indexOf(method), 1)
    } else {
      // Add the relation if it wasn't already
      selected.push(method)
    }

    if (selected.includes('Other')) {
      this.update({
        Methods: { values: selected },
      })
    } else {
      this.update({
        Methods: { values: selected },
        MethodsComments: {},
      })
    }
  }

  updateFrequency = (values) => {
    if ((values || {}).value !== 'Other') {
      this.update({
        Frequency: values,
        FrequencyComments: {},
      })
    } else {
      this.update({
        Frequency: values,
      })
    }
  }

  updateEmployerNotApplicable = (values) => {
    this.update({
      EmployerNotApplicable: values,
      Employer: {},
    })
  }

  updateEmployerAddressNotApplicable = (values) => {
    this.update({
      EmployerAddressNotApplicable: values,
      EmployerAddress: {},
    })
  }

  updateEmployerRelationshipNotApplicable = (values) => {
    this.update({
      EmployerRelationshipNotApplicable: values,
      EmployerRelationship: {},
      HasAffiliation: {},
    })
  }

  render() {
    const relativeContactMinDate = pickDate([
      this.props.applicantBirthdate,
      this.props.Birthdate,
    ])
    const validator = new RelativeValidator(this.props, null)
    const mother = (this.props.Relation || {}).value === 'Mother'
    const father = (this.props.Relation || {}).value === 'Father'
    const immediateFamily = [
      'Father',
      'Mother',
      'Child',
      'Stepchild',
      'Brother',
      'Sister',
      'Half-brother',
      'Half-sister',
      'Stepbrother',
      'Stepsister',
      'Stepmother',
      'Stepfather',
    ].includes((this.props.Relation || {}).value)
    const otherMethods = ((this.props.Methods || {}).values || []).some(
      x => x === 'Other'
    )
    const otherFrequency = (this.props.Frequency || {}).value === 'Other'

    return (
      <div className="relative-item">
        <Field
          title={i18n.t('relationships.relatives.heading.relation')}
          scrollIntoView={this.props.scrollIntoView}
          adjustFor="big-buttons"
        >
          <RadioGroup
            className="relative-relation option-list option-list-vertical"
            required={this.props.required}
            onError={this.props.onError}
            selectedValue={this.props.Relation.value}
          >
            {this.getRelativeOptions().map(relative => (
              <Radio
                name={relative.name}
                label={relative.label}
                value={relative.value}
                className={relative.className}
                onError={this.props.onError}
                onUpdate={(value) => { this.updateField('Relation', value) }}
              />
            ))}
          </RadioGroup>
        </Field>

        <Field
          title={i18n.t('relationships.relatives.heading.name')}
          optional
          filterErrors={Name.requiredErrorsOnly}
          scrollIntoView={this.props.scrollIntoView}
        >
          <Name
            name="Name"
            className="relative-name"
            {...this.props.Name}
            onError={this.props.onError}
            onUpdate={(value) => { this.updateField('Name', value) }}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        </Field>

        <Field
          title={i18n.t('relationships.relatives.heading.birthdate')}
          help="relationships.relatives.help.birthdate"
          adjustFor="labels"
          scrollIntoView={this.props.scrollIntoView}
          shrink
        >
          <DateControl
            name="Birthdate"
            className="relative-birthdate"
            {...this.props.Birthdate}
            prefix={mother || father ? 'parent.dob' : ''}
            relationship={(this.props.Relation || {}).value}
            onError={this.props.onError}
            onUpdate={(value) => { this.updateField('Birthdate', value) }}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('relationships.relatives.heading.birthplace')}
          adjustFor="label"
          scrollIntoView={this.props.scrollIntoView}
          validate={false}
        >
          <Location
            name="Birthplace"
            {...this.props.Birthplace}
            label={i18n.t('relationships.relatives.label.birthplace')}
            layout={Location.BIRTHPLACE_WITHOUT_COUNTY}
            help=""
            hideCounty
            className="relative-birthplace"
            onError={this.props.onError}
            onUpdate={(value) => { this.updateField('Birthplace', value) }}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('relationships.relatives.heading.citizenship')}
          scrollIntoView={this.props.scrollIntoView}
          help="relationships.relatives.help.citizenship"
        >
          <Country
            name="Citizenship"
            multiple
            {...this.props.Citizenship}
            className="relative-citizenship"
            onError={this.props.onError}
            onUpdate={(value) => { this.updateField('Citizenship', value) }}
            required={this.props.required}
          />
        </Field>

        <Show when={mother}>
          <div>
            <Branch
              name="maiden_diff"
              label={i18n.t('relationships.relatives.heading.maiden')}
              labelSize="h4"
              className="eapp-field-wrap relative-maiden-diff"
              {...this.props.MaidenSameAsListed}
              yesLabel={i18n.t('relationships.relatives.label.maiden.same')}
              noLabel={i18n.t('relationships.relatives.label.maiden.diff')}
              onUpdate={(value) => { this.updateField('MaidenSameAsListed', value) }}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
              onError={this.props.onError}
            />
            <Show when={this.props.MaidenSameAsListed.value === 'No'}>
              <Field
                optional
                filterErrors={Name.requiredErrorsOnly}
                scrollIntoView={this.props.scrollIntoView}
              >
                <Name
                  name="MaidenName"
                  className="relative-maidenname eapp-field-wrap"
                  {...this.props.MaidenName}
                  onError={this.props.onError}
                  onUpdate={(value) => { this.updateField('MaidenName', value) }}
                  required={this.props.required}
                  scrollIntoView={this.props.scrollIntoView}
                />
              </Field>
            </Show>
          </div>
        </Show>

        <Show when={immediateFamily}>
          <BranchCollection
            {...this.props.Aliases}
            branchName="has_alias"
            label={i18n.t('relationships.relatives.heading.alias.branch')}
            appendLabel={i18n.t('relationships.relatives.heading.alias.branch')}
            className="relative-alias"
            onUpdate={(value) => { this.updateField('Aliases', value) }}
            onError={this.props.onError}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <div>
              <Alias
                name="Item"
                minDate={this.props.Birthdate}
                relationship="Other"
                onError={this.props.onError}
                hideMaiden={mother}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}
                bind
              />
            </div>
          </BranchCollection>
        </Show>

        <Branch
          name="is_deceased"
          label={i18n.t('relationships.relatives.heading.deceased.branch')}
          labelSize="h4"
          className="relative-deceased"
          {...this.props.IsDeceased}
          onUpdate={(value) => { this.updateField('IsDeceased', value) }}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
          onError={this.props.onError}
        />
        <Show when={(this.props.IsDeceased || {}).value === 'No'}>
          <Field
            title={i18n.t('relationships.relatives.heading.deceased.address')}
            optional
            help="relationships.relatives.help.address"
            scrollIntoView={this.props.scrollIntoView}
            adjustFor="address"
          >
            <Location
              name="Address"
              className="relative-address"
              {...this.props.Address}
              addressBooks={this.props.addressBooks}
              addressBook={this.props.addressBook}
              dispatch={this.props.dispatch}
              layout={Location.ADDRESS}
              geocode
              onUpdate={(value) => { this.updateField('Address', value) }}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>
          <AlternateAddress
            address={this.props.AlternateAddress}
            addressBook={this.props.addressBook}
            belongingTo="AlternateAddress"
            country={countryString(this.props.Address.country)}
            forceAPO
            militaryAddressLabel={i18n.t('address.militaryAddress.relative')}
            onUpdate={this.update}
          />
        </Show>

        <Show when={validator.requiresCitizenshipDocumentation()}>
          <div>
            <Field
              title={i18n.t('relationships.relatives.heading.us.title')}
              titleSize="h4"
              scrollIntoView={this.props.scrollIntoView}
            >
              <Field
                title={i18n.t(
                  'relationships.relatives.heading.us.documentation'
                )}
                titleSize="label"
                className="relative-citizenship-documentation no-margin-bottom"
              />

              <label>{i18n.t('relationships.relatives.para.abroad')}</label>
              <RadioGroup
                className="relative-abroad option-list option-list-vertical"
                required={this.props.required}
                onError={this.props.onError}
                selectedValue={
                  (this.props.CitizenshipDocumentation || {}).value
                }
              >
                <Radio
                  name="abroad-fs"
                  label={i18n.m('relationships.relatives.label.abroad.fs')}
                  value="FS"
                  className="abroad-fs"
                  onError={this.props.onError}
                  onUpdate={(value) => { this.updateField('CitizenshipDocumentation', value) }}
                />
                <Radio
                  name="abroad-ds"
                  label={i18n.m('relationships.relatives.label.abroad.ds')}
                  value="DS"
                  className="abroad-ds"
                  onError={this.props.onError}
                  onUpdate={(value) => { this.updateField('CitizenshipDocumentation', value) }}
                />
              </RadioGroup>

              <label>
                {i18n.t('relationships.relatives.para.naturalized')}
              </label>
              <RadioGroup
                className="relative-naturalized option-list option-list-vertical"
                required={this.props.required}
                onError={this.props.onError}
                selectedValue={
                  (this.props.CitizenshipDocumentation || {}).value
                }
              >
                <Radio
                  name="naturalized-alien"
                  label={i18n.m('relationships.relatives.label.naturalized.alien')}
                  value="NaturalizedAlien"
                  className="naturalized-alien"
                  onError={this.props.onError}
                  onUpdate={(value) => { this.updateField('CitizenshipDocumentation', value) }}
                />
                <Radio
                  name="naturalized-permanent"
                  label={i18n.m('relationships.relatives.label.naturalized.permanent')}
                  value="NaturalizedPermanent"
                  className="naturalized-permanent"
                  onError={this.props.onError}
                  onUpdate={(value) => { this.updateField('CitizenshipDocumentation', value) }}
                />
                <Radio
                  name="naturalized-certificate"
                  label={i18n.m('relationships.relatives.label.naturalized.certificate')}
                  value="NaturalizedCertificate"
                  className="naturalized-certificate"
                  onError={this.props.onError}
                  onUpdate={(value) => { this.updateField('CitizenshipDocumentation', value) }}
                />
              </RadioGroup>

              <label>{i18n.t('relationships.relatives.para.derived')}</label>
              <RadioGroup
                className="relative-derived option-list option-list-vertical"
                required={this.props.required}
                onError={this.props.onError}
                selectedValue={
                  (this.props.CitizenshipDocumentation || {}).value
                }
              >
                <Radio
                  name="derived-alien"
                  label={i18n.m('relationships.relatives.label.derived.alien')}
                  value="DerivedAlien"
                  className="derived-alien"
                  onError={this.props.onError}
                  onUpdate={(value) => { this.updateField('CitizenshipDocumentation', value) }}
                />
                <Radio
                  name="derived-permanent"
                  label={i18n.m('relationships.relatives.label.derived.permanent')}
                  value="DerivedPermanent"
                  className="derived-permanent"
                  onError={this.props.onError}
                  onUpdate={(value) => { this.updateField('CitizenshipDocumentation', value) }}
                />
                <Radio
                  name="derived-certificate"
                  label={i18n.m('relationships.relatives.label.derived.certificate')}
                  value="DerivedCertificate"
                  className="derived-certificate"
                  onError={this.props.onError}
                  onUpdate={(value) => { this.updateField('CitizenshipDocumentation', value) }}
                />
                <Radio
                  name="derived-other"
                  label={i18n.m('relationships.relatives.label.derived.other')}
                  value="Other"
                  className="derived-other"
                  onError={this.props.onError}
                  onUpdate={(value) => { this.updateField('CitizenshipDocumentation', value) }}
                />
              </RadioGroup>
              <Show
                when={
                  (this.props.CitizenshipDocumentation || {}).value === 'Other'
                }
              >
                <Textarea
                  name="OtherCitizenshipDocumentation"
                  className="derived-other-explanation"
                  {...this.props.OtherCitizenshipDocumentation}
                  onError={this.props.onError}
                  onUpdate={(value) => { this.updateField('OtherCitizenshipDocumentation', value) }}
                  required={this.props.required}
                />
              </Show>
            </Field>

            <Field
              title={i18n.t('relationships.relatives.heading.us.number')}
              scrollIntoView={this.props.scrollIntoView}
            >
              <Text
                name="DocumentNumber"
                className="relative-documentnumber"
                maxlength="30"
                pattern={alphaNumericRegEx}
                prefix="alphanumeric"
                {...this.props.DocumentNumber}
                onError={this.props.onError}
                onUpdate={(value) => { this.updateField('DocumentNumber', value) }}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t('relationships.relatives.heading.us.name')}
              scrollIntoView={this.props.scrollIntoView}
            >
              <Text
                name="CourtName"
                className="relative-courtname"
                {...this.props.CourtName}
                onError={this.props.onError}
                onUpdate={(value) => { this.updateField('CourtName', value) }}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t('relationships.relatives.heading.us.address')}
              optional
              scrollIntoView={this.props.scrollIntoView}
              help="relationships.relatives.help.courtaddress"
              adjustFor="labels"
            >
              <Location
                name="CourtAddress"
                {...this.props.CourtAddress}
                layout={Location.US_ADDRESS}
                geocode
                className="relative-courtaddress"
                onError={this.props.onError}
                onUpdate={(value) => { this.updateField('Courtaddress', value) }}
                required={this.props.required}
              />
            </Field>
          </div>
        </Show>

        <Show
          when={
            this.props.Citizenship.value
            && !validator.citizen()
            && this.props.IsDeceased.value === 'No'
          }
        >
          <div>
            <Show
              when={
                this.props.Address
                && countryString(this.props.Address.country || {})
                  === 'United States'
              }
            >
              <div>
                <Field
                  title={i18n.t(
                    'relationships.relatives.heading.address.title'
                  )}
                  comments={false}
                  scrollIntoView={this.props.scrollIntoView}
                  adjustFor="big-buttons"
                >
                  <div>
                    {i18n.t('relationships.relatives.para.notcitizen')}
                    <RadioGroup
                      className="relative-document option-list option-list-vertical"
                      required={this.props.required}
                      onError={this.props.onError}
                      selectedValue={(this.props.Document || {}).value}
                    >
                      <Radio
                        name="document-permanent"
                        label={i18n.m('relationships.relatives.label.document.permanent')}
                        value="Permanent"
                        className="document-permanent"
                        onError={this.props.onError}
                        onUpdate={(value) => { this.updateField('Document', value) }}
                      />
                      <Radio
                        name="document-employment"
                        label={i18n.m('relationships.relatives.label.document.employment')}
                        value="Employment"
                        className="document-employment"
                        onError={this.props.onError}
                        onUpdate={(value) => { this.updateField('Document', value) }}
                      />
                      <Radio
                        name="document-arrival"
                        label={i18n.m('relationships.relatives.label.document.arrival')}
                        value="Arrival"
                        className="document-arrival"
                        onError={this.props.onError}
                        onUpdate={(value) => { this.updateField('Document', value) }}
                      />
                      <Radio
                        name="document-visa"
                        label={i18n.m('relationships.relatives.label.document.visa')}
                        value="Visa"
                        className="document-visa"
                        onError={this.props.onError}
                        onUpdate={(value) => { this.updateField('Document', value) }}
                      />
                      <Radio
                        name="document-f1"
                        label={i18n.m('relationships.relatives.label.document.f1')}
                        value="F1"
                        className="document-f1"
                        onError={this.props.onError}
                        onUpdate={(value) => { this.updateField('Document', value) }}
                      />
                      <Radio
                        name="document-j1"
                        label={i18n.m('relationships.relatives.label.document.j1')}
                        value="J1"
                        className="document-j1"
                        onError={this.props.onError}
                        onUpdate={(value) => { this.updateField('Document', value) }}
                      />
                      <Radio
                        name="document-other"
                        label={i18n.m('relationships.relatives.label.document.other')}
                        value="Other"
                        className="document-other"
                        onError={this.props.onError}
                        onUpdate={(value) => { this.updateField('Document', value) }}
                      />
                    </RadioGroup>

                    <Show when={(this.props.Document || {}).value === 'Other'}>
                      <Textarea
                        name="DocumentComments"
                        className="relative-document-other-comments"
                        {...this.props.DocumentComments}
                        onValidate={this.props.onValidate}
                        onUpdate={(value) => { this.updateField('DocumentComments', value) }}
                        required={this.props.required}
                      />
                    </Show>
                  </div>
                </Field>

                <Field
                  title={i18n.t(
                    'relationships.relatives.heading.address.number'
                  )}
                  scrollIntoView={this.props.scrollIntoView}
                >
                  <Text
                    name="ResidenceDocumentNumber"
                    className="relative-residence-documentnumber"
                    {...this.props.ResidenceDocumentNumber}
                    onError={this.props.onError}
                    maxlength="30"
                    pattern={alphaNumericRegEx}
                    prefix="alphanumeric"
                    onUpdate={(value) => { this.updateField('ResidenceDocumentNumber', value) }}
                    required={this.props.required}
                  />
                </Field>

                <Field
                  title={i18n.t(
                    'relationships.relatives.heading.address.expiration'
                  )}
                  adjustFor="labels"
                  scrollIntoView={this.props.scrollIntoView}
                  shrink
                >
                  <DateControl
                    name="Expiration"
                    className="relative-expiration"
                    {...this.props.Expiration}
                    prefix="relative"
                    applicantBirthdate={this.props.Birthdate}
                    onError={this.props.onError}
                    onUpdate={(value) => { this.updateField('Expiration', value) }}
                    noMaxDate
                    required={this.props.required}
                  />
                </Field>
              </div>
            </Show>

            <Field
              title={i18n.t(
                'relationships.relatives.heading.address.firstcontact'
              )}
              help="relationships.relatives.help.firstcontact"
              adjustFor="labels"
              scrollIntoView={this.props.scrollIntoView}
              shrink
            >
              <DateControl
                name="FirstContact"
                className="relative-first-contact"
                {...this.props.FirstContact}
                minDate={relativeContactMinDate}
                minDateEqualTo
                onError={this.props.onError}
                onUpdate={(value) => { this.updateField('FirstContact', value) }}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t(
                'relationships.relatives.heading.address.lastcontact'
              )}
              help="relationships.relatives.help.lastcontact"
              adjustFor="labels"
              scrollIntoView={this.props.scrollIntoView}
              shrink
            >
              <DateControl
                name="LastContact"
                className="relative-last-contact"
                {...this.props.LastContact}
                prefix="relative"
                minDate={this.props.FirstContact}
                minDateEqualTo
                onError={this.props.onError}
                onUpdate={(value) => { this.updateField('LastContact', value) }}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t('relationships.relatives.heading.address.methods')}
              comments={otherMethods}
              commentsName="MethodsComments"
              commentsValue={this.props.MethodsComments}
              commentsActive={otherMethods}
              commentsRequired={otherMethods}
              onUpdate={(value) => { this.updateField('MethodsComments', value) }}
              onError={this.props.onError}
              adjustFor="big-buttons"
              scrollIntoView={this.props.scrollIntoView}
            >
              <div>
                {i18n.m('relationships.relatives.para.checkall')}
                <CheckboxGroup
                  className="relative-methods option-list option-list-vertical"
                  required={this.props.required}
                  onError={this.props.onError}
                  selectedValues={(this.props.Methods || {}).values}
                >
                  <Checkbox
                    name="methods-inperson"
                    label={i18n.m(
                      'relationships.relatives.label.methods.inperson'
                    )}
                    value="In person"
                    className="methods-inperson"
                    onError={this.props.onError}
                    onUpdate={this.updateMethods}
                  />
                  <Checkbox
                    name="methods-telephone"
                    label={i18n.m(
                      'relationships.relatives.label.methods.telephone'
                    )}
                    value="Telephone"
                    className="methods-telephone"
                    onError={this.props.onError}
                    onUpdate={this.updateMethods}
                  />
                  <Checkbox
                    name="methods-electronic"
                    label={i18n.m(
                      'relationships.relatives.label.methods.electronic'
                    )}
                    value="Electronic"
                    className="methods-electronic"
                    onError={this.props.onError}
                    onUpdate={this.updateMethods}
                  />
                  <Checkbox
                    name="methods-written"
                    label={i18n.m(
                      'relationships.relatives.label.methods.written'
                    )}
                    value="Written"
                    className="methods-written"
                    onError={this.props.onError}
                    onUpdate={this.updateMethods}
                  />
                  <Checkbox
                    name="methods-other"
                    label={i18n.m(
                      'relationships.relatives.label.methods.other'
                    )}
                    value="Other"
                    className="methods-other"
                    onError={this.props.onError}
                    onUpdate={this.updateMethods}
                  />
                </CheckboxGroup>
              </div>
            </Field>

            <Field
              title={i18n.t(
                'relationships.relatives.heading.address.frequency'
              )}
              comments={otherFrequency}
              commentsName="FrequencyComments"
              commentsValue={this.props.FrequencyComments}
              commentsActive={otherFrequency}
              commentsRequired={otherFrequency}
              onUpdate={(value) => { this.updateField('FrequencyComments', value) }}
              onError={this.props.onError}
              scrollIntoView={this.props.scrollIntoView}
              adjustFor="big-buttons"
            >
              <RadioGroup
                className="relative-frequency option-list option-list-vertical"
                required={this.props.required}
                onError={this.props.onError}
                selectedValue={this.props.Frequency.value}
              >
                <Radio
                  name="frequency-daily"
                  label={i18n.m(
                    'relationships.relatives.label.frequency.daily'
                  )}
                  value="Daily"
                  className="frequency-daily"
                  onError={this.props.onError}
                  onUpdate={this.updateFrequency}
                />
                <Radio
                  name="frequency-weekly"
                  label={i18n.m(
                    'relationships.relatives.label.frequency.weekly'
                  )}
                  value="Weekly"
                  className="frequency-weekly"
                  onError={this.props.onError}
                  onUpdate={this.updateFrequency}
                />
                <Radio
                  name="frequency-monthly"
                  label={i18n.m(
                    'relationships.relatives.label.frequency.monthly'
                  )}
                  value="Monthly"
                  className="frequency-monthly"
                  onError={this.props.onError}
                  onUpdate={this.updateFrequency}
                />
                <Radio
                  name="frequency-quarterly"
                  label={i18n.m(
                    'relationships.relatives.label.frequency.quarterly'
                  )}
                  value="Quarterly"
                  className="frequency-quarterly"
                  onError={this.props.onError}
                  onUpdate={this.updateFrequency}
                />
                <Radio
                  name="frequency-annually"
                  label={i18n.m(
                    'relationships.relatives.label.frequency.annually'
                  )}
                  value="Annually"
                  className="frequency-annually"
                  onError={this.props.onError}
                  onUpdate={this.updateFrequency}
                />
                <Radio
                  name="frequency-other"
                  label={i18n.m(
                    'relationships.relatives.label.frequency.other'
                  )}
                  value="Other"
                  className="frequency-other"
                  onError={this.props.onError}
                  onUpdate={this.updateFrequency}
                />
              </RadioGroup>
            </Field>

            <Field
              title={i18n.t('relationships.relatives.heading.employer.name')}
              adjustFor="buttons"
              scrollIntoView={this.props.scrollIntoView}
              shrink
            >
              <NotApplicable
                {...this.props.EmployerNotApplicable}
                name="EmployerNotApplicable"
                label={i18n.t('relationships.relatives.label.idk')}
                or={i18n.m('relationships.relatives.para.or')}
                onError={this.props.onError}
                onUpdate={this.updateEmployerNotApplicable}
              >
                <Text
                  name="Employer"
                  className="relative-employer"
                  {...this.props.Employer}
                  onError={this.props.onError}
                  onUpdate={(value) => { this.updateField('Employer', value) }}
                  required={this.props.required}
                />
              </NotApplicable>
            </Field>

            <Field
              title={i18n.t('relationships.relatives.heading.employer.address')}
              scrollIntoView={this.props.scrollIntoView}
              adjustFor="address"
            >
              <NotApplicable
                {...this.props.EmployerAddressNotApplicable}
                name="EmployerAddressNotApplicable"
                label={i18n.t('relationships.relatives.label.idk')}
                or={i18n.m('relationships.relatives.para.or')}
                onError={this.props.onError}
                onUpdate={this.updateEmployerAddressNotApplicable}
              >
                <Location
                  name="EmployerAddress"
                  {...this.props.EmployerAddress}
                  layout={Location.ADDRESS}
                  geocode
                  className="relative-employer-address"
                  showPostOffice
                  onError={this.props.onError}
                  onUpdate={(value) => { this.updateField('EmployerAddress', value) }}
                  required={this.props.required}
                />
              </NotApplicable>
            </Field>

            <NotApplicable
              {...this.props.EmployerRelationshipNotApplicable}
              name="EmployerRelationshipNotApplicable"
              label={i18n.t('relationships.relatives.label.idk')}
              or={i18n.m('relationships.relatives.para.or')}
              onError={this.props.onError}
              onUpdate={this.updateEmployerRelationshipNotApplicable}
            >
              <Branch
                name="has_affiliation"
                label={i18n.t(
                  'relationships.relatives.heading.employer.affiliated'
                )}
                labelSize="h4"
                className="relative-affiliation"
                {...this.props.HasAffiliation}
                onUpdate={(value) => { this.updateField('HasAffiliation', value) }}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}
                onError={this.props.onError}
              />
              <Show when={this.props.HasAffiliation.value === 'Yes'}>
                <Field
                  title={i18n.t('relationships.relatives.heading.employer.relationship')}
                  scrollIntoView={this.props.scrollIntoView}
                >
                  <Textarea
                    name="EmployerRelationship"
                    className="relative-employer-relationship"
                    {...this.props.EmployerRelationship}
                    disabled={!this.props.EmployerRelationshipNotApplicable.applicable}
                    onError={this.props.onError}
                    onUpdate={(value) => { this.updateField('EmployerRelationship', value) }}
                    required={this.props.required}
                  />
                </Field>
              </Show>
            </NotApplicable>
          </div>
        </Show>
      </div>
    )
  }
}

Relative.defaultProps = {
  Relation: '',
  Name: {},
  Birthdate: {},
  Birthplace: {},
  Citizenship: {},
  MaidenSameAsListed: '',
  MaidenName: {},
  Aliases: {},
  IsDeceased: {},
  Address: {},
  DocumentNumber: {},
  CourtName: {},
  CourtAddress: {},
  Document: '',
  DocumentComments: {},
  ResidenceDocumentNumber: {},
  Expiration: {},
  FirstContact: {},
  LastContact: {},
  Methods: {},
  MethodsComments: {},
  Frequency: '',
  FrequencyComments: {},
  EmployerNotApplicable: {},
  EmployerAddressNotApplicable: { applicable: true },
  EmployerRelationshipNotApplicable: { applicable: true },
  Employer: {},
  EmployerAddress: {},
  HasAffiliation: '',
  EmployerRelationship: {},
  addressBooks: {},
  addressBook: 'Relative',
  dispatch: () => {},
  onUpdate: () => {},
  onError: (value, arr) => arr,
}
