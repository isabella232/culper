import React from 'react'

import i18n from 'util/i18n'

import {
  Field,
  Branch,
  ValidationElement,
  Textarea,
  DateControl,
} from 'components/Form'

import DrugType from './DrugType'

export default class DrugUse extends ValidationElement {
  update = (updateValues) => {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        DrugType: this.props.DrugType,
        FirstUse: this.props.FirstUse,
        RecentUse: this.props.RecentUse,
        NatureOfUse: this.props.NatureOfUse,
        UseWhileEmployed: this.props.UseWhileEmployed,
        UseWithClearance: this.props.UseWithClearance,
        UseInFuture: this.props.UseInFuture,
        Explanation: this.props.Explanation,
        ...updateValues,
      })
    }
  }

  updateDrugType = (values) => {
    this.update({ DrugType: values })
  }

  updateFirstUse = (values) => {
    this.update({ FirstUse: values })
  }

  updateRecentUse = (values) => {
    this.update({ RecentUse: values })
  }

  updateNatureOfUse = (values) => {
    this.update({ NatureOfUse: values })
  }

  updateUseWhileEmployed = (values) => {
    this.update({ UseWhileEmployed: values })
  }

  updateUseWithClearance = (values) => {
    this.update({ UseWithClearance: values })
  }

  updateUseInFuture = (values) => {
    this.update({ UseInFuture: values })
  }

  updateExplanation = (values) => {
    this.update({ Explanation: values })
  }

  render() {
    const {
      requireDrugWhileSafety, requireDrugWithClearance, requireDrugInFuture,
    } = this.props

    return (
      <div className="drug-use">
        <Field
          title={i18n.t('substance.drugs.use.heading.drugType')}
          className="drug-type-use"
          adjustFor="labels"
          scrollIntoView={this.props.scrollIntoView}
        >
          <DrugType
            name="DrugType"
            {...this.props.DrugType}
            onUpdate={this.updateDrugType}
            onError={this.props.onError}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        </Field>

        <Field
          title={i18n.t('substance.drugs.use.heading.firstUse')}
          adjustFor="datecontrol"
          scrollIntoView={this.props.scrollIntoView}
        >
          <DateControl
            name="FirstUse"
            className="first-use"
            {...this.props.FirstUse}
            hideDay
            minDateEqualTo
            onUpdate={this.updateFirstUse}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('substance.drugs.use.heading.recentUse')}
          adjustFor="datecontrol"
          scrollIntoView={this.props.scrollIntoView}
        >
          <DateControl
            name="RecentUse"
            className="recent-use"
            {...this.props.RecentUse}
            hideDay
            minDate={this.props.FirstUse}
            prefix="drugUsage"
            minDateEqualTo
            onUpdate={this.updateRecentUse}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('substance.drugs.use.heading.natureOfUse')}
          scrollIntoView={this.props.scrollIntoView}
        >
          <Textarea
            name="NatureOfUse"
            className="nature-of-use"
            {...this.props.NatureOfUse}
            onUpdate={this.updateNatureOfUse}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        {requireDrugWhileSafety && (
          <Branch
            name="UseWhileEmployed"
            label={i18n.t('substance.drugs.use.heading.useWhileEmployed')}
            labelSize="h4"
            className="use-while-employed"
            {...this.props.UseWhileEmployed}
            onError={this.props.onError}
            required={this.props.required}
            onUpdate={this.updateUseWhileEmployed}
            scrollIntoView={this.props.scrollIntoView}
          />
        )}

        {requireDrugWithClearance && (
          <Branch
            name="UseWithClearance"
            label={i18n.t('substance.drugs.use.heading.useWithClearance')}
            labelSize="h4"
            className="use-with-clearance"
            {...this.props.UseWithClearance}
            onError={this.props.onError}
            required={this.props.required}
            onUpdate={this.updateUseWithClearance}
            scrollIntoView={this.props.scrollIntoView}
          />
        )}

        {requireDrugInFuture && (
          <span>
            <Branch
              name="UseInFuture"
              label={i18n.t('substance.drugs.use.heading.useInFuture')}
              labelSize="h4"
              className="use-in-future"
              {...this.props.UseInFuture}
              onError={this.props.onError}
              required={this.props.required}
              onUpdate={this.updateUseInFuture}
              scrollIntoView={this.props.scrollIntoView}
            />

            <Field
              title={i18n.t('substance.drugs.use.heading.explanation')}
              scrollIntoView={this.props.scrollIntoView}
            >
              <Textarea
                name="Explanation"
                className="explanation"
                {...this.props.Explanation}
                onUpdate={this.updateExplanation}
                onError={this.props.onError}
                required={this.props.required}
              />
            </Field>
          </span>
        )}
      </div>
    )
  }
}

DrugUse.defaultProps = {
  UseWhileEmployed: {},
  UseWhileClearance: {},
  UseWhileFuture: {},
  onError: (value, arr) => arr,
}
