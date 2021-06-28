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

  const [translate, setTranslate] = useState(0);
  const [activeItem, setActiveItem] = useState(0);
  const [itemWidth, setItemWidth] = useState(490);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [clickStart, setClickStart] = useState(0);
  const [clickEnd, setClickEnd] = useState(0);
  const [didDown, setDidDown] = useState(false);
  const contentWidth = itemWidth * (props.content.length - 1);

//Responsive sizing logic

  const ref = useRef(null);

  const init = () => {
    if (ref.current.offsetWidth < itemWidth) {
        setItemWidth(ref.current.offsetWidth)
    };
  };

  const handleOrientation = (e) => {

    const absolute = false;
    const alpha = null;
    const beta = null;
    const gamma = null;
  
    if (e.absolute !== absolute || e.alpha !== alpha || e.beta !== beta || e.gamma !== gamma) {
     resize();
    };
    return;
  };

  const resize = () => {
    if (ref.current.offsetWidth < 490)  {
      setTranslate(activeItem * itemWidth);
      setItemWidth(ref.current.offsetWidth)
    } else {
      setTranslate(activeItem * itemWidth);
      setItemWidth(490)
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
    if (translate < contentWidth) {
      setTranslate(translate + itemWidth);
      setActiveItem(activeItem === props.content.length - 1 ? 0 : activeItem + 1)
    } else {
      setTranslate(0);
      setActiveItem(activeItem === props.content.length - 1 ? 0 : activeItem + 1)
    };
  };

  const prevItem = () => {
    if (translate <= contentWidth && translate !== 0) {
      setTranslate(translate - itemWidth);
      setActiveItem(activeItem === 0 ? props.content.length - 1 : activeItem - 1);
    } else {
      setTranslate(contentWidth);
      setActiveItem(activeItem === 0 ? props.content.length - 1 : activeItem - 1);
    };
  };

  const dotClick = (index) => {
    setTranslate(index * itemWidth);
    setActiveItem(index);
  };

//Swipe logic

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };


  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
    const diff = touchStart - touchEnd;
    if (diff > 0 && (activeItem * itemWidth) <= contentWidth) {
        setTranslate(diff + activeItem * itemWidth);
    }
    else if (diff < 0 && (activeItem * itemWidth) >= 0) {
        setTranslate(diff + activeItem * itemWidth);
    }
  };

  const handleTouchEnd = () => {
    const diff = touchStart - touchEnd;
      if (diff > 0 && ((activeItem + 1) * itemWidth) <= contentWidth) {
        setTranslate((activeItem + 1) * itemWidth);
        setActiveItem(activeItem === props.content.length - 1 ? 0 : activeItem + 1);
      } else {
        setTranslate(0);
        setActiveItem(activeItem === props.content.length - 1 ? 0 : activeItem + 1);
      };
      if (diff < 0 && ((activeItem - 1) * itemWidth) >= 0) {
          setTranslate((activeItem - 1) * itemWidth);
          setActiveItem(activeItem === 0 ? props.content.length - 1 : activeItem - 1);
      } else if (diff < 0 && ((activeItem - 1) * itemWidth) <= 0) {
        setTranslate(contentWidth);
        setActiveItem(activeItem === 0 ? props.content.length - 1 : activeItem - 1);
      };
  };


  const handleClickStart = (e) => {
    e.preventDefault();
    setClickStart(e.clientX);
    setDidDown(true)
  };


  const handleClickMove = (e) => {
    e.preventDefault();
    setClickEnd(e.clientX);
    if (!didDown) {
      return
    } else {
      const diff = clickStart - clickEnd;
      if (diff > 0 && (activeItem * itemWidth) <= contentWidth) {
          setTranslate(diff + activeItem * itemWidth);
      } else
      if (diff < 0 && (activeItem * itemWidth) >= 0) {
          setTranslate(diff + activeItem * itemWidth);
      };
    }
    setDidDown(false)
  };

  const handleClickEnd = () => {
    if (didDown === false) {
      const diff = clickStart - clickEnd;
      if (diff > 0 && ((activeItem + 1) * itemWidth) <= contentWidth) {
        setTranslate((activeItem + 1) * itemWidth);
        setActiveItem(activeItem === props.content.length - 1 ? 0 : activeItem + 1);
      } else {
        setTranslate(0);
        setActiveItem(activeItem === props.content.length - 1 ? 0 : activeItem + 1);
      };
      if (diff < 0 && ((activeItem - 1) * itemWidth) >= 0) {
          setTranslate((activeItem - 1) * itemWidth);
          setActiveItem(activeItem === 0 ? props.content.length - 1 : activeItem - 1);
      } else if (diff < 0 && ((activeItem - 1) * itemWidth) <= 0) {
        setTranslate(contentWidth);
        setActiveItem(activeItem === 0 ? props.content.length - 1 : activeItem - 1);
      };
    } else {return}
  };

  return (
    <Container ref={ref}>
      <CarouselContent itemWidth={itemWidth}>
        {props.content.map(image => <Item
                key={image.id}
                content={image.imgUrl}
                translate={translate}
                itemWidth={itemWidth}
                didDown={didDown}
                handleTouchStart={handleTouchStart}
                handleTouchMove={handleTouchMove}
                handleTouchEnd={handleTouchEnd}
                handleClickStart={handleClickStart}
                handleClickMove={handleClickMove}
                handleClickEnd={handleClickEnd}
               />)}
        <Arrow direction = 'right' handleClick={nextItem}/>               
        <Arrow direction = 'left' handleClick={prevItem}/>
        <Dots content = {props.content} activeItem = {activeItem} handleClick = {dotClick}/>               
      </CarouselContent>
    </Container>
  );
}

export default Carousel
