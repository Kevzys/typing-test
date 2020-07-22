import React from 'react';
import TextField from '@material-ui/core/TextField';

function UserType(props) {

    function handleTyping(e) {
        if (props.isActive === false) {
            props.setIsActive(true);
        }
        props.setUserType(e.target.value);
        checkDone(e.target.value);

    }

    function checkDone(e) {
        if (e.length === props.toType.length) {
            props.setIsActive(!props.isActive);
            calculateWPM();
        }
    }

    function calculateWPM() {
        let a = props.userType.split(" ");
        props.setWPM((a.length/props.seconds) * 60);
    }


    return (
        <div>
            <h1>How fast can you type?</h1>

            <TextField 
                placeholder="Start typing..." 
                onChange={handleTyping}
                id="outlined-multiline-static"
                label="Type here"
                multiline
                rows={4}
                variant="outlined"

            />
        
           
        </div>
    )
}

export default UserType;