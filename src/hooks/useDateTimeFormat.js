import { DEFAULT_LANGUAGE } from '@/constants/locale'

const isDateTimeFormatSupported =
  typeof Intl !== 'undefined' && Intl.DateTimeFormat

export const formatDate = (timeStamp, { language = DEFAULT_LANGUAGE } = {}) => {
  const date = new Date(timeStamp)

  if (!isDateTimeFormatSupported) {
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }

    return date.toLocaleDateString(language, options)
  }

  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  }

  return new Intl.DateTimeFormat(language, options).format(date)
}

export default function useDateTimeFormat (timeStamp) {
  return formatDate(timeStamp, { language: DEFAULT_LANGUAGE })
}
