import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classNames from 'classnames';

function hexToRGB(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  return alpha ?
    "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")" :
    "rgb(" + r + ", " + g + ", " + b + ")";
}


const styles = {
  root: ({ width, color }) => {
    const borderWidth = width / 10;
    const borderLight = `${borderWidth}px solid ${hexToRGB(color, 0.3)}`;
    return {
      position: 'relative',
      textIndent: '-9999em',
      borderRadius: '50%',
      width: `${width}px`,
      height: `${width}px`,
      borderTop: borderLight,
      borderRight: borderLight,
      borderBottom: borderLight,
      borderLeft: `${borderWidth}px solid ${color}`,
      animation: 'load8 0.75s infinite linear',
    }
  },

  '@keyframes load8': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
};

const Spinner = ({ classes, className }) => (
  <div className={classNames(classes.root, className)} />
);

Spinner.propTypes = {
  width: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default injectSheet(styles)(Spinner);