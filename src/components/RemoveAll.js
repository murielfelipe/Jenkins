import { render } from '@testing-library/react';
import React from 'react';

const RemoveAll = (props) => {
    return (
        <div>
            <button type="button" onClick={props.removeAllHandler}> Remove All </button>
        </div>
    )
}

export default RemoveAll; 