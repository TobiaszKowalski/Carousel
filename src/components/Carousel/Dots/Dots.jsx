import React from 'react';
import styled from 'styled-components';
import Dot from './Dot/Dot';

const StyledDots = styled.div`
  position: absolute;
  bottom: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const Dots = (props) => {

  return (
    <StyledDots>
      {props.content.map((image, index) => {
        return <Dot
          key = {image.id}
          index = {index}
          active = {props.activeItem === index}
          handleClick = {props.handleClick} />
      })}
    </StyledDots>
  )
};

export default Dots