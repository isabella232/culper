import React from 'react'
import ReactMarkdown from 'react-markdown'
import en from './en'

const locales = { en }

class I18n {
  t (id) {
    let locale = 'en'

    try {
      let text = id.split('.').reduce((o, i) => o[i], locales[locale]) || ''
      let what = Object.prototype.toString.call(text)
      if (!text || text === '' || what !== '[object String]') {
        throw new Object('Could not find ' + id)
      }
      return text
    } catch (e) {
      return locale + '.' + id
    }
  }

  m (id) {
    return markdownById(id)
  }
}

export const i18n = new I18n()

export const markdown = (text) => {
  return (<ReactMarkdown source={text} />)
}

export const markdownById = (id) => {
  return markdown(i18n.t(id))
}