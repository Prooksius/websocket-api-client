declare global {
  interface Window {
    onLoadCaptchaV3Callback(): void
  }
}

// Callback by default is an empty function to execute nothing when no callback is passed
const loadReCaptcha = (
  siteKey: string,
  callback = () => {
    return false
  }
) => {
  const script = document.createElement("script")

  if (!window.onLoadCaptchaV3Callback && callback) {
    window.onLoadCaptchaV3Callback = callback
  }
  script.src = `https://www.recaptcha.net/recaptcha/api.js?onload=onLoadCaptchaV3Callback&render=${siteKey}`

  document.body.appendChild(script)
}

export default loadReCaptcha
