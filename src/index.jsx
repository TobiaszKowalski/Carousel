import React from 'react';
import ReactDOM from 'react-dom';
import Carousel from './components/Carousel/Carousel';
import { content } from './content/content';


ReactDOM.render(
    <Carousel content={content} />,
  document.querySelector('#root')
);


