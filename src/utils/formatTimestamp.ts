export function formatTimestamp(timestamp: number | string = Date.now()): string {
  let time = timestamp
  if (typeof timestamp === 'string') {
    time = +timestamp
  }
  const date = new Date(time)

  if (Number.isNaN(date.getTime())) {
    throw new Error('无效的时间戳')
  }

  const pad = (value: number) => String(value).padStart(2, '0')

  return (
    [date.getFullYear(), pad(date.getMonth() + 1), pad(date.getDate())].join('-') +
    ' ' +
    [pad(date.getHours()), pad(date.getMinutes()), pad(date.getSeconds())].join(':')
  )
}
