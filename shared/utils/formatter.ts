import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

class FormatterService {
  formatCoin(val: number, digit = 2) {
    const fixFormat = Math.pow(10, digit)
    const valueFormat = Math.floor(val * fixFormat) / fixFormat

    return val ?
        new Intl.NumberFormat('en-US', {
          maximumFractionDigits: 6
        }).format(val)
      : val
  }

  formatErrors(data: Record<string, string[]>): Record<string, string> {
    const params: Record<string, any> = {}
    for (const key in data) {
      if (data[key]) {
        const errors: string[] = data[key] || []
        params[key] = errors.length > 0 ? errors[0] : ''
      }
    }
    return params
  }

  ellipsis(val: string, max = 5, type: 'tail' | 'mesial' = 'tail'): string {
    switch (type) {
      case 'tail':
        return val.substring(0, max) + '...'
      case 'mesial':
        return val.substring(0, max) + '...' + val.slice(-max)
      default:
        return val.substring(0, max)
    }
  }

  timeLocal(val: string) {
    return dayjs.utc(val, 'YYYY-MM-DD HH:mm:ss').local().format('YYYY/MM/DD HH:mm:ss')
  }
}

export const Formatter = new FormatterService()
