import React from 'react';
import styled from 'styled-components';


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
        {props.direction === 'right'  
          ? <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="20px" viewBox="0 0 24 24" width="20px" fill="gray">
            <g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><polygon points="6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12"/></g></svg> 
          : <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="gray">
            <path d="M0 0h24v24H0V0z" fill="none" opacity=".87"/><path d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z"/></svg>}
      </ArrowStyled>
    )
  };
  
  export default Arrow