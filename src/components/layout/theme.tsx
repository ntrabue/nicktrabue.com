interface ITheme {
  breakpoints: {
    sm: number
    md: number
    lg: number
  }
  colors: {
    blue: string
    green: string
    pink: string
    text: string
  }
}

const theme: ITheme = {
  breakpoints: {
    lg: 992,
    md: 768,
    sm: 576,
  },
  colors: {
    blue: "#0080ff",
    green: "#00ff7f",
    pink: "#ff0080",
    text: "#53565a",
  },
}

export { theme, ITheme }
