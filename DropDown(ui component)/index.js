import React, {Component, Fragment, createRef} from 'react'
import {createPortal} from 'react-dom'
import PropTypes from 'prop-types'
import classes from './styles.scss'


class DropDown extends Component {
  componentDidMount() { this.forceUpdate() }
  componentWillMount() {
    document.body.appendChild(this.portal)
    document.addEventListener('scroll', this.scrollHandler, true)
  }
  componentWillUnmount() {
    document.body.removeChild(this.portal)
    document.removeEventListener('scroll', this.scrollHandler, true)
  }
  portal = document.createElement('div')
  state = {open: false, recount: false, position: {}}
  activator = createRef()
  container = createRef()
  scrollHandler = () => {
    if (this.state.open) this.close()
    else if (this.state.recount) this.forceUpdate()
  }
  toggle = () => this.state.open ? this.close() : this.open()
  open = () => {
    this.setState(state => ({...state, open: true, recount: true}))
  }
  close = () => {
    this.setState(state => ({...state, open: false}))
    setTimeout(() => this.setState(state => ({...state, recount: false})), 200)
  }
  render() {
    const {
            props: {component: Component, children, position, overflow, slide, gap, ...rest},
            state: {open}, activator, container
          } = this,
          {left = 0, top = 0, width = 0, height = 0} = activator.current ? activator.current.getBoundingClientRect() : {},
          {clientHeight = 0, clientWidth = 0} = container.current || {},
          fromLeft = position.includes('left'),
          fromTop = position.includes('top'),
          coors = {
            left: fromLeft ? left : left + width - clientWidth,
            top: fromTop ? top - clientHeight - gap : top + height + gap
          }
    return (
      <Fragment>
        <Component onClick={() => container.current.focus()} active={open} innerRef={activator} {...rest}/>
        {createPortal((
          <div
            onFocus={this.open}
            onBlur={this.close}
            tabIndex="-1"
            className={[
              classes.container,
              slide && classes.slide,
              fromTop && classes.fromTop,
              open && classes.open
            ]}
            style={{
              minWidth: width,
              left: coors.left < 0 ? 0 : coors.left,
              top: coors.top
            }}
            ref={container}
          >
            {children}
          </div>
        ), this.portal)}
      </Fragment>
    )
  }

  static propTypes = {
    component: PropTypes.any.isRequired,
    children: PropTypes.any.isRequired,
    position: PropTypes.string,
    overflow: PropTypes.bool,
    slide: PropTypes.bool,
    gap: PropTypes.number,
  }

  static defaultProps = {
    position: 'bottom left',
    gap: 0
  }
}

export default DropDown