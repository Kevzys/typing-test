import React, {useEffect} from 'react';
import Typography from '@material-ui/core/Typography';

function CheckSimilarity(props) {

    useEffect(()=> {
        let userSplit = props.userType.split("");
        let corrTypeCount = 0;
        let incorrTypeCount = 0;

        for (const [index, element] of userSplit.entries()) {
            if (props.toType.charAt(index) === element) {
                corrTypeCount++;
            }
            else {
                incorrTypeCount++;
            }
        }

    props.setCorrectType(corrTypeCount);
    props.setIncorrType(incorrTypeCount);

    }, [props.userType]);

    

    return (
        <div>
            <Typography variant="h6">
                Correct characters: {props.correctType}
            </Typography>

            <Typography variant="h6">
                Incorrect characters: {props.incorrType}
            </Typography>
        </div>
    )
}

export default CheckSimilarity;