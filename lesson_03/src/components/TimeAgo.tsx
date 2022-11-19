import { parseISO, formatDistanceToNow } from 'date-fns'
import { FC } from 'react'

type Props = {
  timeStamp: string
}

const TimeAgo: FC<Props> = ({ timeStamp }) => {
  const timeAgo = timeStamp
    ? () => {
        const date = parseISO(timeStamp)
        const timePeriod = formatDistanceToNow(date)
        return `${timePeriod} ago`
      }
    : () => ''

  return (
    <span title={timeStamp}>
      &nbsp; <i>{timeAgo()}</i>
    </span>
  )
}

export default TimeAgo
