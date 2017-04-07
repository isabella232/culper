import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'
import Svg from '../Svg'
import Textarea from '../Textarea'

export default class Field extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      errors: props.errors,
      helpActive: props.helpActive,
      commentsActive: props.commentsActive
    }

    this.toggleHelp = this.toggleHelp.bind(this)
    this.toggleComments = this.toggleComments.bind(this)
    this.onFlush = this.onFlush.bind(this)
  }

  /**
   * Handle the click event for the rendering of messages.
   */
  toggleHelp (event) {
    this.setState({ helpActive: !this.state.helpActive }, () => {
      this.scrollIntoView()
    })
  }

  /**
   * Toggle the comment visibility.
   */
  toggleComments () {
    const future = !this.visibleComments()
    const value = future ? (this.props.commentsActive || {}).value : ''
    this.setState({ commentsActive: future }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          ...this.props.commentsActive,
          name: this.props.commentsName,
          value: value
        })
      }
    })
  }

  /**
   * Determines if the comments should be visible.
   */
  visibleComments () {
    return this.props.comments && (this.props.commentsValue || this.state.commentsActive || this.props.commentsActive)
  }

  /**
   * Handle validation event.
   */
  handleValidation (event, status, errors) {
    if (!event) {
      return
    }

    let e = [...this.state.errors]

    // Let's clean out what we current have stored for this target.
    let name = !event.target || !event.target.name ? 'input' : event.target.name
    e = this.cleanErrors(e, `.${name}.`)

    if (errors) {
      let errorFlat = super.flattenObject(errors)

      if (errorFlat.endsWith('.')) {
        // If the error message ends with a period we can assume
        // it needs to be flushed of similar errors
        e = this.cleanErrors(e, errorFlat)
      } else {
        // Append this to the list of errors.
        let name = `${this.props.errorPrefix || ''}`
        if (!errorFlat.startsWith(name)) {
          errorFlat = `${name || 'input'}.${errorFlat}`
        }

        name = `error.${errorFlat}`
        if (!e.includes(name) && !name.endsWith('.')) {
          e.push(name)
        }
      }
    }

    this.setState({ errors: e }, () => {
      super.handleValidation(event, status, errors)
      if (e.length) {
        this.scrollIntoView()
      }
    })
  }

  /**
   * Some children need to flush all errors.
   */
  onFlush () {
    this.setState({ errors: [] })
  }

  /**
   * Clean up error message array on matching string
   */
  cleanErrors (old, remove) {
    let arr = []

    for (let err of old) {
      if (err.indexOf(remove) === -1 && !err.endsWith('.')) {
        arr.push(err)
      }
    }

    return arr
  }

  /**
   * Render the comments toggle link if needed.
   */
  commentsButton () {
    if (!this.props.comments) {
      return null
    }

    if (this.visibleComments()) {
      return (
        <a href="javascript:;;" onClick={this.toggleComments} className="comments-button remove">
          <span>{i18n.t(this.props.commentsRemove)}</span>
          <i className="fa fa-times-circle"></i>
        </a>
      )
    }

    return (
      <a href="javascript:;;" onClick={this.toggleComments} className="comments-button add">
        <span>{i18n.t(this.props.commentsAdd)}</span>
        <i className="fa fa-plus-circle"></i>
      </a>
    )
  }

  /**
   * Render the comments if necessary.
   */
  comments () {
    if (!this.props.comments || !this.visibleComments()) {
      return null
    }

    return (
      <Textarea name={this.props.commentsName}
                value={this.props.commentsValue}
                onUpdate={this.props.onUpdate}
                onValidate={this.props.onValidate}
                />
    )
  }

  /**
   * Render the help icon if needed.
   */
  icon () {
    if (!this.props.help) {
      return null
    }

    return (
      <a href="javascript:;"
         tabIndex="-1"
         title="Show help"
         className="toggle"
         onClick={this.toggleHelp}>
        <Svg src="img/info.svg" />
      </a>
    )
  }

  /**
   * Render the help and error messages allowing for Markdown syntax.
   */
  messages () {
    let el = []

    if (this.state.errors && this.state.errors.length) {
      const markup = this.state.errors.map(err => {
        const noteId = `${err}.note`
        let note = i18n.t(noteId)
        if (note.indexOf(noteId) > -1) {
          note = ''
        } else {
          note = <em>{note}</em>
        }

        return (
          <div key={super.guid()}>
            <h5>{i18n.t(`${err}.title`)}</h5>
            {i18n.m(`${err}.message`)}
            {note}
          </div>
        )
      })

      el.push(
        <div className="message error" key={super.guid()}>
          <i className="fa fa-exclamation"></i>
          {markup}
        </div>
      )
    }

    if (this.state.helpActive && this.props.help) {
      const noteId = `${this.props.help}.note`
      let note = i18n.t(noteId)
      if (note.indexOf(noteId) > -1) {
        note = ''
      } else {
        note = <em>{note}</em>
      }

      el.push(
        <div className="message help" key={super.guid()}>
          <i className="fa fa-question"></i>
          <h5>{i18n.t(`${this.props.help}.title`)}</h5>
          {i18n.m(`${this.props.help}.message`)}
          {note}
          <a href="javascript:;;"
             className="close"
             onClick={this.handleClick}>
            {i18n.t('help.close')}
          </a>
        </div>
      )
    }

    return el
  }

  /**
   * Iterate through the children and bind methods to them.
   */
  children () {
    return React.Children.map(this.props.children, (child) => {
      let extendedProps = {}

      if (React.isValidElement(child)) {
        // Inject ourselves in to the validation callback
        if (child.props.onValidate) {
          extendedProps.onFlush = this.onFlush
          extendedProps.onValidate = (event, status, errors) => {
            this.handleValidation(event, status, errors)
            if (child.props.onValidate) {
              child.props.onValidate(event, status, errors)
            }
          }
        }
      }

      return React.cloneElement(child, {
        ...child.props,
        ...extendedProps
      })
    })
  }

  /**
   * Checks if the children and help message are within the current viewport. If not, scrolls the
   * help message into view so that users can see the message without having to manually scroll.
   */
  scrollIntoView () {
    // Grab the bottom position for the help container
    const helpBottom = this.refs.field.getBoundingClientRect().bottom

    // Grab the current window height
    const winHeight = window.innerHeight

    // Flag if help container bottom is within current viewport
    const notInView = (winHeight < helpBottom)

    const active = this.state.helpActive || this.state.errors.length

    if (active && this.props.scrollIntoView && notInView) {
      this.refs.messages.scrollIntoView(false)
    }
  }

  render () {
    const klass = `field ${this.state.commentsActive ? 'with-comments' : ''} ${this.props.className || ''}`.trim()

    return (
      <div className={klass} ref="field">
        <span className="title">{this.props.title}</span>
        <span className="content">
          <span className="component">
            {this.children()}
            {this.comments()}
            {this.commentsButton()}
          </span>
          <span className="icon">
            {this.icon()}
          </span>
        </span>
        <span className="messages" ref="messages">
          {this.messages()}
        </span>
      </div>
    )
  }
}

Field.defaultProps = {
  title: '',
  className: '',
  errors: [],
  help: '',
  helpActive: false,
  comments: false,
  commentsName: 'Comments',
  commentsValue: '',
  commentsActive: false,
  commentsAdd: 'comments.add',
  commentsRemove: 'comments.remove'
}
