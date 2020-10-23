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
    background: string
  }
}

const breakpoints = {
  lg: 992,
  md: 768,
  sm: 576,
}

const lightThemeColors = {
  background: "#fff",
  blue: "#0080ff",
  green: "#00ff7f",
  pink: "#ff0080",
  text: "#53565a",
}

const darkThemeColors = {
  ...lightThemeColors,
  background: "#2b2b2b",
  green: "#12854b",
  pink: "#fc2a93",
  text: "#fff",
}

const lightTheme: ITheme = {
  breakpoints,
  colors: lightThemeColors,
}
const darkTheme: ITheme = {
  breakpoints,
  colors: darkThemeColors,
}

export { lightTheme, darkTheme, ITheme }
