import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import Button from '../../ui/Button';

const styles = {
  list: {
    position: 'absolute',
    zIndex: 10,
    top: '100%',
    left: 0,
    right: 0,
    maxHeight: 500,
    overflowY: 'auto',
    background: '#fff',
    border: '1px solid #ddd',
    boxShadow: '0 4px 30px rgba(0,0,0,0.15)',
  },
  listItem: {
    borderBottom: '1px solid #eee',
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    flexGrow: 1,
    padding: '0 16px',
  },
  image: {
    flexShrink: 0,
    width: 120,
  },
  controls: {
    flexShrink: 0,
    paddingRight: 16,
  },
};

const ListOfVideo = ({ classes, list, onVideoSelect }) => {

  const createClickHandler = item => () => {
    onVideoSelect(item);
  };

  return list.length > 0 ? (
    <div className={classes.list}>
      {list.map((item, key) => {
        const {
          title,
          thumbnails: { default: image },
        } = item;

        return (
          <div key={key} className={classes.listItem}>
            <div className={classes.image}>
              <img
                src={image.url}
                width={image.width}
                height={image.height}
                alt={title}
              />
            </div>
            <div className={classes.title}>{title}</div>
            <div className={classes.controls}>
              <Button color="blue" size="small" onClick={createClickHandler(item)}>Play</Button>
            </div>
          </div>
        );
      })}
    </div>
  ) : null;
};

ListOfVideo.propTypes = {
  list: PropTypes.array.isRequired,
  onVideoSelect: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(ListOfVideo);