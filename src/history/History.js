import React  from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import Button from '../ui/Button';

const styles = {
  root: {
    flexBasis: 260,
    marginRight: 32,
  },
  head: {
    fontSize: '1.25em',
    fontWeight: 'bold',
    margin: '0 0 1em',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.75em',
  },
  itemTitle: {
    color: '#5f5fda',
    fontSize: '0.875em',
    cursor: 'pointer',
    paddingRight: 8,
    '&:hover': {
      color: '#444',
    },
  },
  itemControls: {
    flexShrink: 0,
  },
  empty: {
    fontSize: '0.875em',
    color: '#777',
  }
};

const History = ({ list, onPlay, onDelete, classes }) => {

  const handlePlayClick = (video) => () => {
    onPlay(video);
  };

  const handleDeleteClick = (id) => () => {
    onDelete(id);
  };

  const renderList = () => (
    list.map((item, key) => (
      <div key={key} className={classes.item}>
        <div onClick={handlePlayClick(item)} className={classes.itemTitle}>{item.title}</div>
        <div className={classes.itemControls}>
          <Button onClick={handleDeleteClick(item.id)} color="red" size="small">Delete</Button>
        </div>
      </div>
    ))
  );

  return (
    <div className={classes.root}>
      <h2 className={classes.head}>Watch history</h2>
      {list.length > 0 ?
        renderList() :
        <div className={classes.empty}>History is empty</div>
      }
    </div>
  );
};

History.propTypes = {
  list: PropTypes.array,
  onPlay: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(History);