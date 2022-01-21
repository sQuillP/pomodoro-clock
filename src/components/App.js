import React, {useState,useEffect} from 'react';
import CreatePomodoro from './CreatePomodoro';
import TimesUp from './TimesUp';
import '../CSS/App.css';


const App = ()=>
{
    const [isRunning,updateRunningState] = useState(false);
    const [mode, updateMode] = useState("work");
    const [timer,updateTimer] = useState(null);
    const [time,updateTime] = useState({
        work:{
            minutes: 0,
            seconds: 0
        },
        break:{
            minutes: 0,
            seconds: 0
        }
    });
    const [originalTime,setOriginalTime] = useState(time);
    const [displayTimesUp,updateShowTimesUp] = useState(false);
    const [timeSet, updateTimeSet] = useState(false);

     
    let wMinutes = time.work.minutes, 
          wSeconds = time.work.seconds,
          bMinutes = time.break.minutes,
          bSeconds = time.break.seconds;



    useEffect(()=>{
        if(time[mode].minutes === 0 && time[mode].seconds === 0)
        {
            if(timeSet)
            {
                (mode === 'work') ? updateMode('break') : updateMode('work');
                updateShowTimesUp(true);
            }
            clearInterval(timer);
            updateTimer(null);
            updateRunningState(false);
            updateTime(originalTime);
        }
    },[time[mode].seconds,time[mode].minutes]);

    

    const getMinutesAndSeconds = (workMinutes,workSeconds,breakMinutes,breakSeconds)=> {
        const timeConfig = {
            work:{
                minutes: Number(workMinutes),
                seconds: Number(workSeconds)
            },
            break:{
                minutes: Number(breakMinutes),
                seconds: Number(breakSeconds)
            }
        }
        updateTime(timeConfig);
        setOriginalTime(timeConfig);
        updateTimeSet(true);
    }

    const startTimer = ()=>{
        if(time[mode].minutes === 0 && time[mode].seconds === 0) return;
        if(isRunning)
            clearInterval(timer);
        else
        {
            const newClock = setInterval(timeController, 1000);
            updateTimer(newClock);
        }
        updateRunningState(!isRunning);
    }

    const restartTimer = ()=>{
        clearInterval(timer);
        updateTimer(null);
        updateRunningState(false);
        updateTime(originalTime);
    }

    const skipTimer = ()=>{
        if(isRunning)
        {
            clearInterval(timer);
            updateRunningState(false);
            updateTimer(null);
        }
        mode==='work'?updateMode('break'):updateMode('work');
        updateTime(originalTime);
    }

    const deleteClock = ()=>{
        const timeConfig = {
            work:{
                minutes: 0,
                seconds: 0
            },
            break:{
                minutes: 0,
                seconds: 0
            }
        };
        updateRunningState(false);
        updateMode('work');
        clearInterval(timer);
        updateTimer(null);
        updateTime(timeConfig);
        setOriginalTime(timeConfig);
        updateTimeSet(false);
    }



    const timeController = ()=>{
        if(mode === 'work')
        {
            if(wSeconds === 0)
            {
                wMinutes--;
                wSeconds = 59;
            }
            else
                wSeconds--;
        }
        else
        {
            if(bSeconds === 0)
            {
                bMinutes--;
                bSeconds = 59;
            }
            else
                bSeconds--;
        }
        return updateTime({
            work:{
                minutes: wMinutes,
                seconds: wSeconds
            },
            break:{
                minutes: bMinutes,
                seconds: bSeconds
            }
        });
    }

    const removeTimesUp = ()=>{
        updateShowTimesUp(false);
    }

    const showTimesUp = ()=>{

        if(displayTimesUp)
        {
            return (
                <TimesUp mode = {mode} removeTimesUp={removeTimesUp}/>
            );
        }
    }

    const formatTime = (timeValue)=>{
        if(Number(timeValue) <= 9)
            return '0'+Number(timeValue);
        return timeValue;
    }

    const displayPlayStateIcon = ()=>{
        if(!isRunning)
            return "fas fa-play-circle";
        return "fas fa-pause-circle";
    }

    const calcBarWidth =()=>{
        const totalTime = originalTime[mode].minutes*60+originalTime[mode].seconds;
        const currentTime = time[mode].minutes*60+time[mode].seconds;
        console.log(currentTime,totalTime);
        const result = (currentTime/totalTime)*100;
        console.log(result);
        if(result === 0 || result === Infinity)
            return {width: "100%"};

        return {width: result+'%'};
    }

    return (
        <div className ='main-container'>
            <div className ='content-container'>
                <CreatePomodoro getMinutesAndSeconds={getMinutesAndSeconds}/>
                {showTimesUp()}
                <div className ='session-banner'>
                    <h1>{mode==='work'?'Work Session':'Break Session'}</h1>
                </div>
                <div className ='clock-content'>
                    <div className ='timer-wrapper'>
                        <h1>{formatTime(time[mode].minutes)}:{formatTime(time[mode].seconds)}</h1>
                    </div>
                    <div className ='hourGlass-wrapper'>
                        <div className='hourGlass' style={calcBarWidth()}></div>
                    </div>
                </div>
                <div className ='button-wrapper'>
                    <div onClick={()=>startTimer()} className ='start-clock'><i className={displayPlayStateIcon()}></i></div>
                    <div onClick ={()=>deleteClock()}className ='delete-clock'><i className ='fas fa-times-circle'></i></div>
                    <div onClick = {()=>restartTimer()} className ='restart-timer'><i className="fas fa-redo"></i></div>
                    <div onClick={()=>skipTimer()} className ='skip-timer'><i className="fas fa-fast-forward"></i></div>
                </div>
            </div>
        </div>
    );
}

export default App;