import React, { useState, useRef } from 'react'
import "./style.scss"

interface Props{
  scrollStepInPx: number,
  delayInMs: number
}

const ScrollButton : React.FC<Props> = (props) =>{
  const [intervalId, setIntervalId] = useState<number>(0)
  const intervalIdRef = useRef(intervalId);
  intervalIdRef.current = intervalId;

  const scrollStep = () => {
    if (window.scrollY === 0) {
      window.clearInterval(intervalIdRef.current);
    }
    window.scroll(0, window.scrollY - props.scrollStepInPx);
  }

  const scroll = () => {
    let newIntervalId = window.setInterval(scrollStep, props.delayInMs);
    setIntervalId(newIntervalId)
  }

  const handleClickEvent = (evt : React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    evt.preventDefault()
    scroll()
  }

  return (
    <button 
      id='scroll'
      className='scroll' 
      onClick={ (event) => handleClickEvent(event)}>
      <span className='chevron up'></span>
    </button>
  )
}

export default ScrollButton