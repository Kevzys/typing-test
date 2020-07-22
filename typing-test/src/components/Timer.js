import React, {useEffect} from 'react';
import { Button } from '@material-ui/core';

function Timer (props) {


    function toggle() {
        props.setIsActive(!props.isActive)
    }

    function reset() {
        props.setSeconds(0);
        props.setIsActive(false);
    }

    useEffect(() => {
        let interval = null;
        if (props.isActive) {
            interval = setInterval(()=> {
                props.setSeconds(seconds => seconds + 1);
            }, 1000);
        }
        else if (!props.isActive && props.seconds!==0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [props.isActive, props.seconds])

    return (
        <div>
            <Button color="secondary" variant="outlined" onClick={toggle}>{props.isActive ? 'Pause' : 'Start'}</Button>
            <Button color="secondary" variant="outlined" onClick={reset}>Reset</Button>
        
            <h3>Time: {props.seconds}</h3>
        </div>
    )
}

export default Timer;
