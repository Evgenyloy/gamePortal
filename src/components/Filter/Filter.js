import { tagList1 } from '../../data/data';
import './filter.scss';

const Filter = (props) => {
  const onClick = (e) => {
    props.onFilterSelected(e);
  };

  const tagItemRender = () => {
    const tagList = tagList1.map((item) => {
      return (
        <li
          className="dropdown__list-item"
          data-value={item}
          onClick={onClick}
          id="categorySelected"
          key={item}
        >
          {item}
        </li>
      );
    });
    return tagList;
  };

  const tagList = tagItemRender();

  let platform;
  switch (props.platformSelected) {
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
            onClick={onClick}
            id="platformSelected"
          >
            All Platforms
          </li>
          <li
            className="dropdown__list-item"
            data-value="pc"
            onClick={onClick}
            id="platformSelected"
          >
            PC (Windows)
          </li>
          <li
            className="dropdown__list-item"
            data-value="browser"
            onClick={onClick}
            id="platformSelected"
          >
            web browser
          </li>
        </ul>
      </div>
      <div className="dropdown">
        <span>Genre/Tag:</span>
        <div className="dropdown__button">{props.categorySelected}</div>
        <ul className="dropdown__list dropdown__list-tag">{tagList}</ul>
      </div>
      <div className="dropdown">
        <span>Genre/Tag:</span>
        <div className="dropdown__button">{props.sortBy}</div>
        <ul className="dropdown__list ">
          <li
            className="dropdown__list-item"
            data-value="relevance"
            onClick={onClick}
            id="sortBy"
          >
            relevance
          </li>
          <li
            className="dropdown__list-item"
            data-value="popularity"
            onClick={onClick}
            id="sortBy"
          >
            popularity
          </li>
          <li
            className="dropdown__list-item"
            data-value="release-date"
            onClick={onClick}
            id="sortBy"
          >
            release date
          </li>
          <li
            className="dropdown__list-item"
            data-value="alphabetical"
            onClick={onClick}
            id="sortBy"
          >
            alphabetical
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Filter;
