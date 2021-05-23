import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Arrow from './Arrow/Arrow';
import Dots from './Dots/Dots';
import Item from './Item/Item';


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CarouselContent = styled.div`
  position: relative;
  display: flex;
  height: 99vh;
  width: ${props=>props.itemWidth}px;
  overflow: hidden;
  box-shadow: 1px 5px 30px black;
`;

const Carousel = (props) => {

  const [state, setState] = useState({
    translate: 0,
    activeItem: 0,
    itemWidth: 490,
    touchStart: 0,
    touchEnd: 0
  })

  const contentWidth = state.itemWidth * (props.content.length - 1);

//Responsive sizing logic

  const ref = useRef(null);

  const init = () => {
    if (ref.current.offsetWidth < state.itemWidth) {
      setState({
        ...state,
        itemWidth: ref.current.offsetWidth,
      }); 
    };
  };

  const handleOrientation = (e) => {

    let absolute = e.absolute;
    let alpha = e.alpha;
    let beta  = e.beta;
    let gamma = e.gamma;
  
    if (e.absolute !== absolute || e.alpha !== alpha || e.beta !== beta || e.gamma !== gamma) {
     return resize();
    };
    return;
  };

  const resize = () => {
    if (ref.current.offsetWidth < 490)  {
      setState({
        ...state,
        translate: state.activeItem * state.itemWidth,
        itemWidth: ref.current.offsetWidth,
      });
    } else {
        setState({
          ...state,
          translate: state.activeItem * state.itemWidth,
          itemWidth: 490,
        });
      };
  };

  useEffect(() => {
    window.addEventListener('load', init);
    window.addEventListener('resize', resize);
    window.addEventListener('deviceorientation', handleOrientation);
    return () => {
      window.removeEventListener('load', init);
      window.removeEventListener('resize', resize);
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  });

//Slide change logic

  const nextItem = () => {
    if (state.translate < contentWidth) {
      setState({
          ...state,
          translate: state.translate + state.itemWidth,
          activeItem: state.activeItem === props.content.length - 1 ? 0 : state.activeItem + 1
      });
    } else {
      setState({
        ...state,
        translate: 0,
        activeItem: state.activeItem === props.content.length - 1 ? 0 : state.activeItem + 1
      });
    };
  };

  const prevItem = () => {
    if (state.translate <= contentWidth && state.translate !== 0) {
      setState({
          ...state,
          translate: state.translate - state.itemWidth,
          activeItem: state.activeItem === 0 ? props.content.length - 1 : state.activeItem - 1
      });
    } else {
      setState({
          ...state,
          translate: contentWidth,
          activeItem: state.activeItem === 0 ? props.content.length - 1 : state.activeItem - 1
      });
    };
  };

  const dotClick = (index) => {
    setState({
      ...state,
      translate: index * state.itemWidth,
      activeItem: index
    });
  };

//Swipe logic

  const handleTouchStart = (e) => {
    setState({
      ...state,
      touchStart: e.targetTouches[0].clientX
    });
  };

  const handleTouchMove = (e) => {
    setState({
      ...state,
      touchEnd: e.targetTouches[0].clientX
    });
  };

  const handleTouchEnd = () => {
    let diff = state.touchStart - state.touchEnd;
      if (diff > 0 && ((state.activeItem + 1) * state.itemWidth) <= contentWidth) {
        setState({
            ...state,
            translate: (state.activeItem + 1) * state.itemWidth,
            activeItem: state.activeItem === props.content.length - 1 ? 0 : state.activeItem + 1
        });
      } else {
        setState({
          ...state,
          translate: 0,
          activeItem: state.activeItem === props.content.length - 1 ? 0 : state.activeItem + 1
        });
      };
      if (diff < 0 && ((state.activeItem - 1) * state.itemWidth) >= 0) {
          setState({
              ...state,
              translate: (state.activeItem - 1) * state.itemWidth,
              activeItem: state.activeItem === 0 ? props.content.length - 1 : state.activeItem - 1
          });
      } else if (diff < 0 && ((state.activeItem - 1) * state.itemWidth) <= 0) {
        setState({
          ...state,
          translate: contentWidth,
          activeItem: state.activeItem === 0 ? props.content.length - 1 : state.activeItem - 1
        });
      };
  };

  return (
    <Container ref={ref}>
      <CarouselContent itemWidth={state.itemWidth}>
        {props.content.map(image => <Item
                key={image.id}
                content={image.imgUrl}
                translate={state.translate}
                itemWidth={state.itemWidth}
                handleTouchStart={handleTouchStart}
                handleTouchMove={handleTouchMove}
                handleTouchEnd={handleTouchEnd}
               />)}
        <Arrow direction = 'right' handleClick={nextItem}/>               
        <Arrow direction = 'left' handleClick={prevItem}/>
        <Dots content = {props.content} activeItem = {state.activeItem} handleClick = {dotClick}/>               
      </CarouselContent>
    </Container>
  );
}

export default Carousel
