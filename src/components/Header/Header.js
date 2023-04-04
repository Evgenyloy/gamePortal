import { Link } from 'react-router-dom';
import { tagsData } from '../../data/data';
import './header.scss';

const Header = (props) => {
  const onButtonClick = () => {
    props.onBurgerClick();
    document.body.classList.toggle('noscroll');
  };

  const onMainLinkClick = (e) => {
    props.onMainLinkClick(e.currentTarget.dataset.link);

    document.body.classList.remove('noscroll');
  };

  const onTagClick = (e) => {
    props.onTagClick(e.target.dataset.link);
  };

  const tagsRender = (tagsData) => {
    const item = tagsData.map(({ name, data }) => {
      return (
        <li className="sub-menu__item" key={name}>
          <Link
            to="/game_list"
            className="sub-menu__link"
            data-link={data}
            onClick={onTagClick}
          >
            {name}
          </Link>
        </li>
      );
    });
    return item;
  };

  const burgerClassName = props.popupVisible ? 'burger active' : 'burger';

  const tagList = tagsRender(tagsData);
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <Link
            to="/"
            className="header__link main-link"
            data-link="all"
            onClick={onMainLinkClick}
          >
            <h1 className="header__title">
              MmoGames <span className="header__title-span">Portal</span>
            </h1>
          </Link>
          <nav className="header__nav">
            <Link
              to="/game_list"
              className="header__link"
              onClick={onMainLinkClick}
              data-link="pc"
            >
              PC games
            </Link>
            <Link
              to="/game_list"
              className="header__link"
              onClick={onMainLinkClick}
              data-link="browser"
            >
              browser games
            </Link>
            <Link to="/news-list" className="header__link" data-link="news">
              news
            </Link>
          </nav>
          <div className={burgerClassName} onClick={onButtonClick}>
            <span className="burger__line"></span>
            <span className="burger__line"></span>
            <span className="burger__line"></span>
          </div>
        </div>
      </div>
      <div className="sub-menu">
        <div className="container">
          <ul className="sub-menu__list">
            <span className="sub-menu__span">popular tags:</span>
            {tagList}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
