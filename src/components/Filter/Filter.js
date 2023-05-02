import { tagList1 } from '../../data/data';
import {
  platformSelected,
  categorySelected,
  sortBy,
} from '../../slices/filtersSlice';
import { useDispatch, useSelector } from 'react-redux';
import './filter.scss';

const Filter = (props) => {
  const dispatch = useDispatch();
  const { platform, category, sort } = useSelector((state) => state.filters);

  const onPlatformSelected = (e) => {
    dispatch(platformSelected(e.target.dataset.value));
    props.errorReset();
  };

  const onTagSelected = (e) => {
    dispatch(categorySelected(e.target.dataset.value));
    props.errorReset();
  };

  const onSortBy = (e) => {
    dispatch(sortBy(e.target.dataset.value));
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

  let selectedPlatform;
  switch (platform) {
    case 'pc':
      selectedPlatform = 'PC (Windows)';
      break;
    case 'browser':
      selectedPlatform = 'web browser';
      break;
    case 'all':
      selectedPlatform = 'All Platforms';
      break;
    default:
      selectedPlatform = 'All Platforms';
      break;
  }

  return (
    <div className="gamelist-filter">
      <div className="dropdown">
        <span>Platforms:</span>
        <div className="dropdown__button">{selectedPlatform}</div>
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
        <div className="dropdown__button">{category}</div>
        <ul className="dropdown__list dropdown__list-tag">{tagList}</ul>
      </div>
      <div className="dropdown">
        <span>sortBy:</span>
        <div className="dropdown__button">{sort}</div>
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
