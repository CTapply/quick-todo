import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { withStyles } from 'material-ui/styles';
import { createClass, deleteStyles } from './createStyleSheet';
import './Slide.css';

const defaultStyle = {
  transition: 'transform 300ms ease-in-out',
  transform: 'scaleY(0)',
  'transform-origin': 'top',
};

const transitionStyles = {
  entering: { transform: 'scaleY(0)' },
  entered: { transform: 'scaleY(1)' },
};

const Slide = ({ children, ...props }) => {
  // console.log(children)
  // const styles = {};
  const timePerChild = 200 / children.length;
  const style = document.getElementById('animation-style-id');
  console.log(style && style.sheet.cssRules.length);
  if (!style || style.sheet.cssRules.length !== (children.length * 4) + 1) {
    console.log('number we actually have', !style || style.sheet.cssRules.length);
    console.log('number we expect', (children.length * 4) + 1);
    deleteStyles();
    console.log('length after deleted', !style || style.sheet.cssRules.length);
    createClass('.collapsable-list-item', `transition: transform ${timePerChild}ms ease-in-out;`);

    for (let i = 0; i < children.length; i += 1) {
      createClass(`.slide-${i}-enter`, `transform: translateY(${-100 * (i + 2)}%);`);
      createClass(`.slide-${i}-enter-active`, `transition-delay: ${timePerChild * i}ms; transform: translateY(${0}%);`);
      createClass(`.slide-${i}-exit`, `transform: translateY(${0}%);`);
      createClass(`.slide-${i}-exit-active`, `transition-delay: ${timePerChild * (children.length - i)}ms; transform: translateY(${-100 * (i + 2)}%);`);
    }
  }

  console.log('styles', children)
  return (
    children.map((child, i) => {
      return (
        <CSSTransition
          {...props}
          key={child.key}
          timeout={timePerChild * (children.length)}
          classNames={`slide-${i}`}
        >
          {child}
        </CSSTransition>
      );
    })
  );
};

export default Slide;
