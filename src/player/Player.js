import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import YouTubePlayer from 'youtube-player';

import Button from '../ui/Button';

const styles = {
  container: {
    flexGrow: 1,
  },
  player: {
    position: 'relative',
    width: 640,
    height: 430,
    margin: '0 auto',
    boxShadow: 'inset 0 0 1px #ccc',
    '&:before': {
      content: '":("',
      position: 'absolute',
      top: '50%',
      left: '50%',
      margin: '-0.75em 0 0 -0.25em',
      zIndex: 0,
      fontSize: '6em',
      color: '#ccc',
      transform: 'rotate(90deg)',
    },
  },
  playerHolder: {
    display: props => props.video ? 'block' : 'none',
    position: 'relative',
    zIndex: 2,
  },
  playerControls: {
    padding: '4px 8px',
  },
};

class Player extends PureComponent {

  constructor(props) {
    super(props);

    this.youtubePlayer = null;
    this.handlePlay = this.handlePlay.bind(this);
  }

  componentDidMount() {
    this.player = YouTubePlayer(this.youtubePlayer, {
      height: '390',
      width: '640',
    });

    this.player.on('stateChange', (event) => {
      // Play video event type
      if (event.data === 1) {
        this.props.addToHistory(this.props.video.id);
      }
    });
  }

  handlePlay() {
    this.player.playVideo();
  }

  componentDidUpdate() {
    const {
      video,
      autoplay,
    } = this.props;

    video.id && this.player.cueVideoById(video.id);
    autoplay && this.player.playVideo();
  }

  getPlayerRef = node => {
    this.youtubePlayer = node;
  };

  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.container}>
        <div className={classes.player}>
          <div className={classes.playerHolder}>
            <div ref={this.getPlayerRef} />
            <div className={classes.playerControls}>
              <Button color="blue" onClick={this.handlePlay}>Play</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Player.propTypes = {
  autoplay: PropTypes.bool.isRequired,
  video: PropTypes.shape({
    id: PropTypes.string,
  }),
  addToHistory: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(Player);