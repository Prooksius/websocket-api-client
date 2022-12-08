import React, { Component } from "react"
import PropTypes from "prop-types"

declare global {
  interface Window {
    grecaptcha: {
      execute(sitekey: string, payload: { action: string }): void
    }
  }
}

interface ReCaptchaProps {
  elementID: string
  verifyCallbackName: string
  verifyCallback(token: string): void
  sitekey: string
  action: string
}

interface ReCaptchaState {
  ready: boolean
}

const propTypes = {
  elementID: PropTypes.string,
  verifyCallbackName: PropTypes.string,
  verifyCallback: PropTypes.func,
  sitekey: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
}

const defaultProps = {
  elementID: "g-recaptcha",
  verifyCallbackName: "verifyCallback",
}

const isReady = () =>
  typeof window !== "undefined" &&
  typeof window.grecaptcha !== "undefined" &&
  typeof window.grecaptcha.execute !== "undefined"

let readyCheck: NodeJS.Timer

class ReCaptcha extends Component<ReCaptchaProps, ReCaptchaState> {
  static propTypes: {
    elementID: PropTypes.Requireable<string>
    verifyCallbackName: PropTypes.Requireable<string>
    verifyCallback: PropTypes.Requireable<(...args: any[]) => any>
    sitekey: PropTypes.Validator<string>
    action: PropTypes.Validator<string>
  }
  static defaultProps: { elementID: string; verifyCallbackName: string }
  constructor(props: ReCaptchaProps) {
    super(props)
    this.state = {
      ready: isReady(),
    }
  }

  componentDidMount() {
    if (!this.state.ready) {
      //      this.execute()
    } else {
      readyCheck = setInterval(this._updateReadyState, 1000)
    }
  }

  /*
  componentDidUpdate(_, prevState) {
    if (this.state.ready && !prevState.ready) {
      //      this.execute()
    }
  }
  */

  componentWillUnmount() {
    clearInterval(readyCheck)
  }

  execute = async () => {
    const {
      sitekey,
      //      verifyCallback,
      action,
    } = this.props

    if (this.state.ready) {
      return await window.grecaptcha.execute(sitekey, { action })
      /*
        .then(token => {
          if (typeof verifyCallback !== 'undefined') {
            verifyCallback(token)
          }
        })
        */
    }
  }

  _updateReadyState = () => {
    if (isReady()) {
      this.setState(() => ({ ready: true }))
      clearInterval(readyCheck)
    }
  }

  render() {
    return this.state.ready ? (
      <div
        id={this.props.elementID}
        data-verifycallbackname={this.props.verifyCallbackName}
      />
    ) : (
      <div id={this.props.elementID} className="g-recaptcha" />
    )
  }
}

ReCaptcha.propTypes = propTypes
ReCaptcha.defaultProps = defaultProps

export default ReCaptcha
