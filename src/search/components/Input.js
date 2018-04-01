import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Spinner from './Spinner';
// import Debounce from 'lodash/debounce';

const styles = {
  root: {
    position: 'relative',
  },
  input: {
    width: '100%',
    height: '2em',
    padding: '0 0.5em',
    lineHeight: '2em',
    fontSize: '1.25em',
    border: '1px solid #dbdcde',
    '&:focus': {
      borderColor: '#becde7',
      outline: 'none',
    }
  },
  loading: {
    position: 'absolute',
    top: 10,
    right: 8,
  },
};

const Input = ({ classes, isFetching, onChange, setInputRef, onBlur }) => (
  <div className={classes.root}>
    <input
      type="text"
      ref={input => setInputRef(input)}
      className={classes.input}
      onChange={onChange}
    />

    {isFetching &&
      <Spinner
        className={classes.loading}
        width="20"
        color="#a3a3a9"
      />
    }
  </div>
);

Input.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  setInputRef: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(Input);