import React, { useState, useEffect } from 'react';
import BasicTextField from '../input/BasicTextField'
import { makeStyles } from '@material-ui/core/styles';
import DateInput from '../input/DateInput.js'
import clsx from 'clsx';

export default function FlowerForm(props) {
    const [name, setName] = useState(props.defaultData.name);
    const [created, setCreated] = useState(props.defaultData.created);
    const [lastWatering, setLastWatering] = useState(props.defaultData.lastWatering);
 
    useEffect(() => {
        if (typeof props.defaultData !== 'undefined') {
            setName(props.defaultData.name)
            setCreated(props.defaultData.created)
            setLastWatering(props.defaultData.lastWatering)
        }
    }, [props.defaultData, props.defaultData.name, props.defaultData.created, props.defaultData.lastWatering]);

    const useStyles = makeStyles((theme) => ({
        margin: {
            paddingBottom: theme.spacing(1),
        },
        textField: {
            width: '100%',
        },
    }));
    const classes = useStyles();

    return (
        <form
            onSubmit={event => {
                event.preventDefault();
                props.formAction({
                    name,
                    created,
                    lastWatering,
                })
            }}
            className={classes.root}
        >   
            <BasicTextField
                className={clsx(classes.margin, classes.textField)}
                value={name}
                onChange={event => setName(event.target.value)}
                label="name"
            />
            <div>   
                <DateInput
                    label="Created date"
                    className={clsx(classes.textField)}
                    variant="outlined"
                    onChange={date => setCreated(date)}
                />
            </div>
            <div>
                <DateInput
                    label="Last watering date"
                    className={clsx(classes.textField)}
                    variant="outlined"
                    onChange={date => setLastWatering(date)}
                />  
            </div>
            {props.submitButton}
        </form>
    );
}