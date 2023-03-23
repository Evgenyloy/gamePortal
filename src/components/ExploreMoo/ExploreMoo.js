import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import Spinner from '../Spinner/Spinner';
import PortalService from '../../services/services';

import { transitionStyles, defaultStyle, duration } from '../../data/data';
import '../ExploreMoo/exploreMoo.scss';

class ExploreMmo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mmoList: [],
      loading: true,
      error: false,
    };

    this.portalService = new PortalService();
  }

  componentDidMount() {
    this.getMMo();
  }

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  onMMoLoaded = (arr) => {
    let item = arr.slice(0, 4);

    this.setState({ mmoList: item, loading: false });
  };

  getMMo = () => {
    this.portalService
      .getCategory('mmorpg')
      .then(this.onMMoLoaded)
      .catch(this.onError);
  };

  renderItems = (arr) => {
    const items = (
      <Transition in={true} timeout={duration} appear mountOnEnter>
        {(state) =>
          arr.map((item) => {
            const { thumbnail, title, id } = item;

            return (
              <div
                className="mmo__item"
                key={id}
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state],
                }}
              >
                <Link
                  className="mmo__link"
                  to={`/game/${id}`}
                  onClick={() => this.props.onGameSelected(id)}
                >
                  <div className="mmo__img-cont">
                    <img className="mmo__img" src={thumbnail} alt={title} />
                  </div>
                  <div className="mmo__desc-inner">
                    <div className="mmo__desc">{title.toLowerCase()}</div>
                    <span className="mmo__free">free</span>
                  </div>
                </Link>
              </div>
            );
          })
        }
      </Transition>
    );

    return items;
  };

  render() {
    const { mmoList, loading, error } = this.state;

    const content = this.renderItems(mmoList);

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? (
      <div className="mmo__error-message">
        Something went wrong. Refresh the page or try again later
      </div>
    ) : null;

    const className = loading || error ? 'mmo__spinner' : 'mmo__inner';
    return (
      <div className="mmo">
        <div className="container">
          <div className="mmo__top-side">
            <div className="mmo__title">Explore mmo games</div>
            <div className="mmo__button button">
              <Link to="/game-list">browse all </Link>
            </div>
          </div>

          <div className={className}>
            {spinner}
            {errorMessage}
            {content}
          </div>
        </div>
      </div>
    );
  }
}

export default ExploreMmo;
