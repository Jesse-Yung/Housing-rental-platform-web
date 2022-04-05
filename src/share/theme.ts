/*
 * This file contains theme and style variables.
 *
*/

// Responsive Breakpoints

const phonePortraitMax = '575px'

const phoneLandscapeMin = '576px'

const phoneLandscapeMax = '767px'

const tabletMin = '768px'

const tabletMax = '991px'

const desktopMin = '992px'

const desktopMax = '1199px'

const desktopHDMin = '1200px'

// Media Rules

export const phonePortrait = `@media (max-width: ${phonePortraitMax})`

export const phoneLandscape = `@media (min-width: ${phoneLandscapeMin}) and (max-width: ${phoneLandscapeMax})`

export const tablet = `@media (min-width: ${tabletMin}) and (max-width: ${tabletMax})`

export const desktop = `@media (min-width: ${desktopMin}) and (max-width: ${desktopMax})`

export const desktopHD = `@media (min-width: ${desktopHDMin})`

export const phone = `@media (max-width: ${phoneLandscapeMax})`

export const phoneAndTablet = `@media (max-width: ${tabletMax})`

export const tabletAndDesktop = `@media (min-width: ${tabletMin}) and (max-width: ${desktopMax})`

export const anyDesktop = `@media (min-width: ${desktopMin})`

export const exceptPhonePortrait = `@media (min-width: ${phoneLandscapeMin})`

export const exceptPhone = `@media (min-width: ${tabletMin})`

export const light = '@media (prefers-color-scheme: light)'

export const dark = '@media (prefers-color-scheme: dark)'

// Colors

export const headerBackground = '#303846'

export const splashButtonColor = '#2f855a'

export const windowBackgroundColor = '#f7fafc'

export const codeColor = '#4a5568'

export const codeBlue = '#0894ff'

export const codeGreen = '#38b2ac'

export const codePink = '#ed64a6'

export const codeOrange = '#f56565'

export const codePurple = '#d288fd'

export const lightBackground = '#fdfdfd'

export const darkBackground = '#111'

export const lightContent = '#181818'

export const darkContent = '#f8f8f8'

export const lightTint = '#0894ff'

export const darkTint = '#0894ff'

export const lightBorder = '#f2f2f4'

export const darkBorder = '#232324'

export const exampleBackGround = '#2c8eaa'

export const aboutBackGround = '#424242'

export const coreBackGround = '#227093'

export const pymongoBackGround = 'rgb(49, 151, 149)'

export const serverBackGround = '#474787'

export const sqlormBackGround = '#4b6584'

export const commandBackGround = '#4b4b4b'

export const codeBlockBackGround = '#C9D6DF'

// Fonts

export const titleFontStack = 'Barlow, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'

export const contentFontStack = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'

export const codeFontStack = 'JetBrainsMono, monospace'

// Metrics

export const singleSpace = 8

export const codeBlockRadius = 8

export const codeBlockMargin = 8

// Shadows

export const windowBoxShadow = 'rgba(0, 0, 0, 0.07) 0px 20px 53px 0px, rgba(0, 0, 0, 0.04) 0px 4px 15px 0px, rgba(0, 0, 0, 0.024) 0px 2px 6px 0px, rgba(0, 0, 0, 0.01) 0px 0px 2px 0px'

// Mixins

export const flexContainerCenterItems = `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
`

export const wholeScreen = `
    height: 100vh;
    width: 100vw;
`
