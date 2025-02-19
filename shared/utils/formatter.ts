export class Formatter {
  static formatCoin(val: number, digit = 2) {
    const fixFormat = Math.pow(10, digit)
    const valueFormat = Math.floor(val * fixFormat) / fixFormat

    return val ?
        new Intl.NumberFormat('en-US', {
          maximumFractionDigits: 6
        }).format(val)
      : val
  }

  static formatErrors(data: Record<string, string[]>): Record<string, string> {
    const params: Record<string, any> = {}
    for (const key in data) {
      if (data[key]) {
        const errors: string[] = data[key] || []
        params[key] = errors.length > 0 ? errors[0] : ''
      }
    }
    return params
  }
}
