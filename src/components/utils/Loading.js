import React from 'react';
import {Audio} from 'react-loader-spinner'

function Loading(props) {
    return (
        <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Audio/>
        </div>
    );
}

export default Loading;