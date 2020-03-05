import React, { useState, useEffect } from 'react';

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
        >
            <input
                value={name} onChange={event => setName(event.target.value)}
                placeholder="name"
            />
            <input
                value={created} onChange={event => setCreated(event.target.value)}
                placeholder="created"
            />
            <input
                value={lastWatering} onChange={event => setLastWatering(event.target.value)}
                placeholder="last watering"
            />
            <button type="submit">{props.buttonLabel}</button>
        </form>
    );
}