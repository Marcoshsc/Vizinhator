const formatNumber = (n: number) => {
  return n < 10 ? `0${n}` : n.toString()
}

export const formatDate = (date: Date | undefined): string | undefined => {
  if (!date) return undefined
  const monthDay = formatNumber(date.getDate())
  const month = formatNumber(date.getMonth() + 1)
  const year = date.getFullYear()
  return `${monthDay}/${month}/${year}`
}

export const formatDateWithTime = (
  date: Date | undefined
): string | undefined => {
  if (!date) return undefined
  const hours = formatNumber(date.getHours())
  const minutes = formatNumber(date.getMinutes())
  return `${formatDate(date)} ${hours}:${minutes}`
}
