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
    this.getMoo();
  }

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  onMooLoaded = (arr) => {
    let item = arr.slice(0, 4);

    this.setState({ mmoList: item, loading: false });
  };

  getMoo = () => {
    this.portalService
      .getCategory('mmo')
      .then(this.onMooLoaded)
      .catch(this.onError);
  };

  renderItems = (arr) => {
    let tabIndex = 5;
    const items = arr.map(({ thumbnail, title, id }) => {
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
            <div className="mmo__desc">{title}</div>
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
