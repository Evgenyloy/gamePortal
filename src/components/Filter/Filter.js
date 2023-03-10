import { Component } from 'react';

import tagList1 from '../../data/data';
import './filter.scss';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      platformSelected: 'all',
      categorySelected: 'mmorpg',
      sortBy: 'relevance',
    };
  }

  onClick = (e) => {
    this.setState({ [e.target.id]: e.target.dataset.value });
    this.props.onFilterSelected(e);
  };

  tagItemRender = () => {
    const tagList = tagList1.map((item) => {
      const tagList = (
        <li
          className="dropdown__list-item"
          data-value={item}
          onClick={this.onClick}
          id="categorySelected"
          key={item}
        >
          {item}
        </li>
      );
      return tagList;
    });
    return tagList;
  };

  render() {
    const tagList = this.tagItemRender();

    let platform;

    switch (this.state.platformSelected) {
      case 'pc':
        platform = 'PC (Windows)';
        break;
      case 'browser':
        platform = 'web browser';
        break;
      case 'all':
        platform = 'All Platforms';
        break;
      default:
        platform = 'All Platforms';
        break;
    }

    return (
      <div className="gamelist-filter">
        <div className="dropdown">
          <span>Platforms:</span>
          <div className="dropdown__button">{platform}</div>
          <ul className="dropdown__list">
            <li
              className="dropdown__list-item"
              data-value="all"
              onClick={this.onClick}
              id="platformSelected"
            >
              All Platforms
            </li>
            <li
              className="dropdown__list-item"
              data-value="pc"
              onClick={this.onClick}
              id="platformSelected"
              value="platformSelected"
            >
              PC (Windows)
            </li>
            <li
              className="dropdown__list-item"
              data-value="browser"
              onClick={this.onClick}
              id="platformSelected"
            >
              web browser
            </li>
          </ul>
        </div>
        <div className="dropdown">
          <span>Genre/Tag:</span>
          <div className="dropdown__button">{this.state.categorySelected}</div>
          <ul className="dropdown__list dropdown__list-tag">{tagList}</ul>
        </div>
        <div className="dropdown">
          <span>Genre/Tag:</span>
          <div className="dropdown__button">{this.state.sortBy}</div>
          <ul className="dropdown__list ">
            <li
              className="dropdown__list-item"
              data-value="relevance"
              onClick={this.onClick}
              id="sortBy"
            >
              relevance
            </li>
            <li
              className="dropdown__list-item"
              data-value="popularity"
              onClick={this.onClick}
              id="sortBy"
            >
              popularity
            </li>
            <li
              className="dropdown__list-item"
              data-value="release-date"
              onClick={this.onClick}
              id="sortBy"
            >
              release date
            </li>
            <li
              className="dropdown__list-item"
              data-value="alphabetical"
              onClick={this.onClick}
              id="sortBy"
            >
              alphabetical
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Filter;
