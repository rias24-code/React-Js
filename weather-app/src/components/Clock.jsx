import React from 'react'
import { useEffect,useState,memo } from 'react'
import {formateDateTime} from '../utils/formatDate.js'

const Clock = () => {
  const [now,setNow] = useState(new Date());
  useEffect(()=> {
    console.log(now)
    const t = setInterval(() => setNow(new Date()),1000);
    return () => clearInterval(t);
  },[]);
  const {day, dmy, time} = formateDateTime(now);
  return (
    <div className='clock'> 
        <div>{day}</div>
        <div>{dmy}</div>
        <div className='time'>{time}</div>
    </div>
  )
}

export default memo(Clock)