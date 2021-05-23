import React from 'react';
import styled from 'styled-components';

const SingleDot = styled.span`
    padding: ${props=>props.active ? '8px' : '6px'};
    margin-right: 7px;
    cursor: pointer;
    border-radius: 50%;
    background: ${props=>props.active ? '#65ade8' : 'grey'};
`;


const Dot = (props) => {

    const handleClick = () => {
        props.handleClick(props.index)
    };

    return (
        <SingleDot active={props.active} index={props.index} onClick={handleClick}/>
    )
};

export default Dot