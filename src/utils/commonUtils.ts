import {
    dayLabelsLong,
    isDeprivedAmericanAndLikesNonsenseDates,
    monthLabelsLong,
} from '../constants/appConstants'

export const createDateStr = (date: Date) => {
    const today = new Date()

    const day = dayLabelsLong[today.getDay()]
    const dateRaw = today.getDate()
    const month = monthLabelsLong[today.getMonth()]
    const year = today.getFullYear()

    let suffix = 'th'

    switch (dateRaw) {
        case 3:
            suffix = 'rd'
            break;
        case 2:
            suffix = 'nd'
            break;
        case 1:
            suffix = 'st'
            break;
        default:
            break;
    }

    const dayMonth = `${dateRaw}${suffix}`

    const dateStr = `${day} ${
        isDeprivedAmericanAndLikesNonsenseDates
            ? `${month} ${dayMonth}`
            : `${dayMonth} of ${month}`
    } ${year}`

    return dateStr
}