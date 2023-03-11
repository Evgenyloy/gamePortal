import './header.scss';

const Header = (props) => {
  const onButtonClick = () => {
    props.onBurgerClick();
    document.body.classList.toggle('noscroll');
  };

  const burgerClassName = props.popupTogler ? 'burger active' : 'burger';

  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <a href="" className="header__link">
            <h1 className="header__title">
              MmoGames <span className="header__title-span">Portal</span>
            </h1>
          </a>
          <nav className="header__nav">
            <a href="#" className="header__link">
              mmo games
            </a>
            <a href="#" className="header__link">
              browser games
            </a>
            <a href="#" className="header__link">
              news
            </a>
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
            <li className="sub-menu__item">
              <a href="#" className="sub-menu__link">
                Free MMORPG
              </a>
            </li>
            <li className="sub-menu__item">
              <a href="#" className="sub-menu__link">
                FPS Games
              </a>
            </li>
            <li className="sub-menu__item">
              <a href="#" className="sub-menu__link">
                Anime Games
              </a>
            </li>
            <li className="sub-menu__item">
              <a href="#" className="sub-menu__link">
                Battle Royale Games
              </a>
            </li>
            <li className="sub-menu__item">
              <a href="#" className="sub-menu__link">
                MMOFPS
              </a>
            </li>
            <li className="sub-menu__item">
              <a href="#" className="sub-menu__link">
                Open World
              </a>
            </li>
            <li className="sub-menu__item">
              <a href="#" className="sub-menu__link">
                MMORTS
              </a>
            </li>
            <li className="sub-menu__item">
              <a href="#" className="sub-menu__link">
                Survival
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
