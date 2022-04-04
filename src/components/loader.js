import React from 'react';
import '../styles/loader.scss'


const Loader = () => {
    return(
            <svg viewBox="0 0 100 100" id="loader">
                <circle
                    fill="none"
                    stroke="#fff"
                    strokeWidth={4}
                    cx={50}
                    cy={50}
                    r={44}
                    opacity={0.5}
                    id="big-circle"
                />
                <circle id="small-circle" fill="#fff" strokeWidth={3} cx={8} cy={54} r={6} />
        </svg>
    )
}

export default Loader;