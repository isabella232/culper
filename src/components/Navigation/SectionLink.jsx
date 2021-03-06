import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import {
  sectionIsLockedSelector,
  sectionHasErrorsSelector,
  sectionIsValidSelector,
} from 'selectors/validation'

export const SectionLink = ({
  section, basePath, errors, completed, locked,
}) => {
  const url = `${basePath}/${section.path}`

  const classes = classnames(
    'section-link',
    {
      locked,
      'has-errors': errors,
      'is-valid': completed,
    }
  )

  const handleClick = (e) => {
    if (locked) e.preventDefault()
  }

  return (
    <li>
      <NavLink
        to={url}
        activeClassName="usa-current"
        className={classes}
        onClick={handleClick}
      >
        <span className="section-name">{section.label}</span>
        <span className="eapp-status-icon" />
      </NavLink>
    </li>
  )
}

SectionLink.propTypes = {
  basePath: PropTypes.string,
  errors: PropTypes.bool,
  completed: PropTypes.bool,
  locked: PropTypes.bool,

  section: PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
}

SectionLink.defaultProps = {
  basePath: '',
  completed: false,
  errors: false,
  locked: false,
}

const mapStateToProps = (state, ownProps) => ({
  ...sectionHasErrorsSelector(state, ownProps),
  ...sectionIsValidSelector(state, ownProps),
  ...sectionIsLockedSelector(state, ownProps),
})

export default withRouter(connect(mapStateToProps)(SectionLink))
