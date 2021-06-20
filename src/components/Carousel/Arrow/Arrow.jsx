import React from 'react';
import styled from 'styled-components';
import nextArrow from '../../../assets/arrow_forward_ios_black_24dp.svg';
import prevArrow from '../../../assets/arrow_back_ios_black_24dp.svg';


const ArrowStyled = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  ${props => props.direction === 'right' ? `right: 10px` : `left: 10px`};
  height: 30px;
  width: 30px;
  background: white;
  opacity: 0.5;
  border-radius: 50%;
  box-shadow: 1px 5px 30px black;
  cursor: pointer;
  &:hover {
    transition: 0.5s ease;
    opacity: 0.9;
  }
`;

const Arrow = (props) => {

    return (
      <ArrowStyled direction={props.direction} onClick={props.handleClick}>
        {props.direction === 'right' ? <img src={nextArrow} alt='' /> : <img src={prevArrow} alt='' />}
      </ArrowStyled>
    )
  };
  
  export default Arrow