import { Component } from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../Spinner/Spinner';

import PortalService from '../../services/services';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
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
    const items = arr.map((item) => {
      const { thumbnail, title, id } = item;

      return (
        <div className="mmo__item" key={id}>
          <Link
            className="mmo__link"
            to="/game"
            onClick={() => this.props.onGameSelected(id)}
          >
            <div className="mmo__img-cont">
              <img className="mmo__img" src={thumbnail} alt="" />
            </div>
            <div className="mmo__desc-inner">
              <div className="mmo__desc">{title.toLowerCase()}</div>
              <span className="mmo__free">free</span>
            </div>
          </Link>
        </div>
      );
    });

    return items;
  };

  render() {
    const { mmoList, loading, error } = this.state;

    const content = this.renderItems(mmoList);

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;

    const className = loading || error ? 'mmo__spinner' : 'mmo__inner';
    return (
      <div className="mmo">
        <div className="container">
          <div className="mmo__top-side">
            <div className="mmo__title">Explore mmo games</div>
            <div className="mmo__button button">
              <Link to="/games">browse all </Link>
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
