import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classNames from 'classnames';


const styles = {
  button: {
    display: 'inline-block',
    border: 'none',
    outline: 'none',
    borderRadius: 3,
    cursor: 'pointer',
    webkitAppearance: 'button',

    '&:focus': {
      outline: 'none',
    },
  },

  // SIZES
  default: {
    height: 24,
    lineHeight: '24px',
    padding: '0 12px',
    fontSize: '0.875em',
  },
  small: {
    height: 20,
    lineHeight: '20px',
    padding: '0 8px',
    fontSize: '0.75em',
  },

  // COLORS
  primary: {
    background: '#eee',
    color: '#444',
  },
  blue: {
    background: '#5c84ea',
    color: '#fff',
    '&:hover': {
      background: '#809ef6',
    }
  },
  red: {
    background: '#ea4040',
    color: '#fff',
    '&:hover': {
      background: '#fa6b69',
    }
  },
};

const Button = ({ classes, onClick, children, className: classNameProp, size, color }) => {
  const className = classNames(
    classes.button,
    {
      [classes.default]: size && size === 'default',
      [classes.small]: size && size === 'small',
      [classes.primary]: color && color === 'primary',
      [classes.blue]: color && color === 'blue',
      [classes.red]: color && color === 'red',
    },
    classNameProp,
  );

  return (
    <button
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
};

Button.defaultProps = {
  size: 'default',
  color: 'primary',
};

export default injectSheet(styles)(Button);