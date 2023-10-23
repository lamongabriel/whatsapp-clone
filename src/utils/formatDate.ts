import { format } from 'date-fns'

export function formatDate(dateToFormat: Date | number) {
  const date = format(dateToFormat, 'HH:mm')

  return date
}
