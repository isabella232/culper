import * as sections from 'constants/sections'
import { i18n } from 'config'

export const IDENTIFICATION = {
  key: sections.IDENTIFICATION,
  name: 'identification',
  path: 'identification',
  store: 'Identification',
  label: i18n.t('identification.section.name'),
}

export const IDENTIFICATION_INTRO = {
  key: sections.IDENTIFICATION_INTRO,
  name: 'intro',
  path: 'intro',
  label: i18n.t('identification.subsection.intro'),
}

export const IDENTIFICATION_NAME = {
  key: sections.IDENTIFICATION_NAME,
  name: 'name',
  path: 'name',
  storeKey: 'ApplicantName',
  label: i18n.t('identification.subsection.name'),
}

export const IDENTIFICATION_BIRTH_DATE = {
  key: sections.IDENTIFICATION_BIRTH_DATE,
  name: 'birthdate',
  path: 'birthdate',
  storeKey: 'ApplicantBirthDate',
  label: i18n.t('identification.subsection.birthdate'),
}

export const IDENTIFICATION_BIRTH_PLACE = {
  key: sections.IDENTIFICATION_BIRTH_PLACE,
  name: 'birthplace',
  path: 'birthplace',
  storeKey: 'ApplicantBirthPlace',
  label: i18n.t('identification.subsection.birthplace'),
}

export const IDENTIFICATION_SSN = {
  key: sections.IDENTIFICATION_SSN,
  name: 'ssn',
  path: 'ssn',
  storeKey: 'ApplicantSSN',
  label: i18n.t('identification.subsection.ssn'),
}

export const IDENTIFICATION_OTHER_NAMES = {
  key: sections.IDENTIFICATION_OTHER_NAMES,
  name: 'othernames',
  path: 'othernames',
  storeKey: 'OtherNames',
  label: i18n.t('identification.subsection.othernames'),
}

export const IDENTIFICATION_CONTACTS = {
  key: sections.IDENTIFICATION_CONTACTS,
  name: 'contacts',
  path: 'contacts',
  storeKey: 'Contacts',
  label: i18n.t('identification.subsection.contacts'),
}

export const IDENTIFICATION_PHYSICAL = {
  key: sections.IDENTIFICATION_PHYSICAL,
  name: 'physical',
  path: 'physical',
  storeKey: 'Physical',
  label: i18n.t('identification.destination.physical'),
}

export const IDENTIFICATION_REVIEW = {
  key: sections.IDENTIFICATION_REVIEW,
  name: 'review',
  path: 'review',
  label: i18n.t('identification.subsection.review'),
}

export default {
  IDENTIFICATION,
  IDENTIFICATION_INTRO,
  IDENTIFICATION_NAME,
  IDENTIFICATION_BIRTH_DATE,
  IDENTIFICATION_BIRTH_PLACE,
  IDENTIFICATION_SSN,
  IDENTIFICATION_OTHER_NAMES,
  IDENTIFICATION_CONTACTS,
  IDENTIFICATION_PHYSICAL,
  IDENTIFICATION_REVIEW,
}
