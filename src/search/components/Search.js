import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Debounce from 'lodash/debounce';
import api from '../../utils/youtube-api';

import Input from './Input';
import ListOfVideo from './ListOfVideo';

function normalizeVideoData(items) {
  return items.map(({ id, snippet: { title, publishedAt, thumbnails } }) => ({
      id: id.videoId,
      playlistId: id.playlistId,
      title,
      publishedAt,
      thumbnails,
    })
  );
}

const getInitialState = () => ({
  list: [],
  isFetching: false,
});

const styles = {
  root: {
    position: 'relative',
    maxWidth: 500,
    margin: '0 auto',
  },
};

class Search extends PureComponent {

  constructor(props) {
    super(props);

    this.state = getInitialState();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleVideoClick = this.handleVideoClick.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.searchVideo = Debounce(this.searchVideo, 500);
  }

  searchVideo(query) {
    if (query === '') {
      this.setState(getInitialState());
      return false;
    }

    api.search(query)
      .then(res => {
        if (res.data && res.data.items) {
          this.setState({
            list: normalizeVideoData(res.data.items),
            isFetching: false,
          });
        }
      })
      .catch(error => console.log(error));
  }

  handleInputChange(e) {
    const query = e.target.value;
    if (!this.state.isFetching) {
      this.setState({
        isFetching: true,
      });
    }
    this.searchVideo(query);
  }

  handleVideoClick(video) {
    this.props.onSelect(video, false);
    this.setState(getInitialState());
  }

  handleClickOutside(e) {
    if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
      this.setState(getInitialState());
    }
  }

  componentDidMount() {
    this.searchInput.focus();
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setInputRef = node => {
    this.searchInput = node;
  };

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  render() {
    const {
      list,
      isFetching,
    } = this.state;

    return (
      <div className={this.props.classes.root} ref={this.setWrapperRef}>
        <Input
          onChange={this.handleInputChange}
          isFetching={isFetching}
          setInputRef={this.setInputRef}
        />

        <ListOfVideo
          list={list}
          onVideoSelect={this.handleVideoClick}
        />
      </div>
    );
  }

}

Search.propTypes = {
  onSelect: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(Search);