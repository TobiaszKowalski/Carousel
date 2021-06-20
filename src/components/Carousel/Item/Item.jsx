import React from 'react';
import styled from 'styled-components';

const ImgStyled = styled.img`
    min-width: 100%;
    height: 100%;
    transform: translateX(-${props => props.translate}px);
    transition: transform ease-out 0.5s;
`;


const Item = (props) => {

    return (
        <ImgStyled translate={props.translate}
         src={props.content} alt=''
         onTouchStart={props.handleTouchStart}
         onTouchMove={props.handleTouchMove}
         onTouchEnd={props.handleTouchEnd}
         onMouseDown={props.handleClickStart}
         onMouseMove={props.handleClickMove}
         onMouseUp={props.handleClickEnd}
         />
    );
};

export default Item;