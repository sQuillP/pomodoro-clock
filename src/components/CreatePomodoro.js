import React, {useState} from 'react';

import '../CSS/CreatePomodoro.css'



const CreatePomodoro = ({getMinutesAndSeconds})=>
{
    const [showOptions,updateShowOptions] = useState(false);
    const [workMinutes,updateWorkMinutes] = useState(0);
    const [workSeconds,updateWorkSeconds] = useState(0);
    const [breakMinutes,updateBreakMinutes] = useState(0);
    const [breakSeconds, updateBreakSeconds] = useState(0);



    const createPomodoro = ()=>{
        getMinutesAndSeconds(workMinutes,workSeconds,breakMinutes,breakSeconds);
        updateShowOptions(!showOptions);
        updateWorkMinutes(0);
        updateWorkSeconds(0);
        updateBreakMinutes(0);
        updateBreakSeconds(0);
    }

    const displayPomodoroOptions = ()=>
    {
        if(!showOptions)
        { 
            return (
                <div className ='create-pomodoro-btn-wrapper'>
                    <button className ='create-pomodoro-btn' onClick = {()=>updateShowOptions(!showOptions)}>Create New Pomodoro</button>
                </div>
            );
        }
        return (
            <div className ='options-container'>
                
                <div className='exit-wrapper' onClick={()=>updateShowOptions(!showOptions)}>
                    <i className="fas fa-times-circle"></i>
                </div>
                <div className ='options-title'>
                    <h1>Create New Pomodoro</h1>
                </div>
                <div className ='time-wrapper'>
                    <div className = 'options-content'>
                        <p>Work</p>
                        <div className='time-container'>

                            <div className='minutes-label'></div>
                            <input min='0' value ={workMinutes} onChange={(e)=>updateWorkMinutes(e.target.value)} type='number'/>

                            <span>:</span>

                            <input min='1' value ={workSeconds} onChange={(e)=>updateWorkSeconds(e.target.value)} type = 'number'/>
                            <div className ='seconds-label'></div>
                            
                        </div>
                    </div>
                    <div className = 'options-content'>
                        <p>Break</p>
                        <div className='time-container'>
                            <div className ='minutes-label'></div>
                            <input min ='0' value={breakMinutes} onChange={(e)=>updateBreakMinutes(e.target.value)} type='number'/>
                            <span>:</span>
                            <input min ='1' value ={breakSeconds} onChange={(e)=>updateBreakSeconds(e.target.value)} type = 'number'/>
                            <div className ='seconds-label'></div>
                        </div>
                    </div>
                </div>
                <div className = 'options-button'>
                    <button onClick = {()=>createPomodoro()} 
                    className='create-pomodoro-btn'>Create</button>
                </div>
            </div>
        );
    }

    return(
        <div className ='create-pomodoro-container'>
            {displayPomodoroOptions()}
        </div>
    );
}

export default CreatePomodoro;