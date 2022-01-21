import React from 'react';
import '../CSS/TimesUp.css';



const TimesUp = ({mode,removeTimesUp})=>{


    return (
        <div className ='timesUp-container'>
            <div onClick={()=>removeTimesUp()} className='exit-wrapper'><i className='fas fa-times-circle'></i></div>
            <h2>Times Up!</h2>
            <p>It is now time to {mode ==='work'?'get back to work.':'take a break.'} Press OK followed by the play button to begin the next cycle.</p>
            <button onClick = {()=>removeTimesUp()} className='timesUp-accept-btn'>OK</button>
        </div>
    )
}


export default TimesUp;