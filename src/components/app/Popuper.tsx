import classNames from "classnames"
import React, { useEffect } from "react"
import { CSSTransition } from "react-transition-group"
import { createSlot } from "react-slotify"
import PropTypes from "prop-types"

export const PopupHeaderSlot = createSlot()
export const PopupFooterSlot = createSlot()

interface PopuperProps {
  opened: boolean
  width: string | null
  height: string | undefined
  contentType: string | undefined
  closeHandler(): void
  unmountHandler(): void
}

const Popuper: React.FC<PopuperProps> = (props) => {
  const handleWrapperClick = (event: React.MouseEvent) => {
    if (
      event.target instanceof Element &&
      event.target.classList.contains("modal-wrapper")
    ) {
      props.closeHandler()
    }
  }

  const escPressed = (event: KeyboardEvent) => {
    console.log("event", event)
    if (event.keyCode === 27) {
      props.closeHandler()
    }
  }

  useEffect(() => {
    document.addEventListener("keyup", escPressed)
    document.querySelector("body").classList.add("noscroll")

    return () => {
      document.querySelector("body").classList.remove("noscroll")
      document.removeEventListener("keyup", escPressed)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <CSSTransition
      classNames={"modal"}
      in={props.opened}
      timeout={300}
      unmountOnExit={true}
      onExited={props.unmountHandler}
    >
      <div className="modal modal-mask">
        <div className="modal-wrapper" onClick={handleWrapperClick}>
          <div
            className={classNames(
              "modal-container",
              {
                "full-width":
                  props.contentType === "video" ||
                  props.contentType === "image",
              },
              { "video-content": props.contentType === "video" },
              { "picture-content": props.contentType === "image" }
            )}
            style={{ width: props.width, height: props.height }}
          >
            <div className="modal-inner">
              <svg
                className={classNames("close", {
                  outside:
                    props.contentType === "video" ||
                    props.contentType === "image",
                })}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                onClick={props.closeHandler}
              >
                <path d="M20 20L4 4m16 0L4 20"></path>
              </svg>
              <div className="modal-header">
                <PopupHeaderSlot.Renderer childs={props.children} />
              </div>
              <div className="modal-body">{props.children}</div>
              <div className="modal-footer">
                <PopupFooterSlot.Renderer childs={props.children} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}

Popuper.defaultProps = {
  opened: false,
  width: "500px",
  height: "auto",
  contentType: "usual",
  closeHandler: undefined,
  unmountHandler: undefined,
}

Popuper.propTypes = {
  opened: PropTypes.bool.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  contentType: PropTypes.string,
  closeHandler: PropTypes.func.isRequired,
  unmountHandler: PropTypes.func,
}

export default Popuper
