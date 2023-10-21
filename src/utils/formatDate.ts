export function formatDate(dateToFormat: string | Date) {
  const date = new Date(dateToFormat)

  const hours24 = date.getHours()
  const minutesOneDigit = date.getMinutes()

  const ampm = hours24 >= 12 ? 'PM' : 'AM'

  const hours12 = hours24 % 12 || 12
  const minutesTwoDigits =
    minutesOneDigit < 10 ? '0' + minutesOneDigit : minutesOneDigit

  const time = hours12 + ':' + minutesTwoDigits + ' ' + ampm

  return time
}
