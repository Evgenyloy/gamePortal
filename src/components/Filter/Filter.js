import { tagList1 } from '../../data/data';
import './filter.scss';

const Filter = (props) => {
  const onPlatformSelected = (e) => {
    props.setPlatformSelected(e.target.dataset.value);
    props.errorReset();
  };

  const onTagSelected = (e) => {
    props.setCategorySelected(e.target.dataset.value);
    props.errorReset();
  };

  const onSortBy = (e) => {
    props.setSortBy(e.target.dataset.value);
    props.errorReset();
  };
  const tagItemRender = () => {
    const tagList = tagList1.map((item) => {
      return (
        <li
          className="dropdown__list-item"
          data-value={item}
          onClick={onTagSelected}
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
            onClick={onPlatformSelected}
            id="platformSelected"
          >
            All Platforms
          </li>
          <li
            className="dropdown__list-item"
            data-value="pc"
            onClick={onPlatformSelected}
            id="platformSelected"
          >
            PC (Windows)
          </li>
          <li
            className="dropdown__list-item"
            data-value="browser"
            onClick={onPlatformSelected}
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
        <span>sortBy:</span>
        <div className="dropdown__button">{props.sortBy}</div>
        <ul className="dropdown__list ">
          <li
            className="dropdown__list-item"
            data-value="relevance"
            onClick={onSortBy}
            id="sortBy"
          >
            relevance
          </li>
          <li
            className="dropdown__list-item"
            data-value="popularity"
            onClick={onSortBy}
            id="sortBy"
          >
            popularity
          </li>
          <li
            className="dropdown__list-item"
            data-value="release-date"
            onClick={onSortBy}
            id="sortBy"
          >
            release date
          </li>
          <li
            className="dropdown__list-item"
            data-value="alphabetical"
            onClick={onSortBy}
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
