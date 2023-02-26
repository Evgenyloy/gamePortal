import { Component } from 'react';
import Spinner from '../Spinner/Spinner';

import PortalService from '../../services/services';
import '../ExploreMoo/exploreMoo.scss';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

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
    this.portalService.getMmo().then(this.onMooLoaded).catch(this.onError);
  };

  renderItems = (arr) => {
    const items = arr.map(({ thumbnail, title, id }) => {
      return (
        <div className="mmo__item" key={id}>
          <a className="mmo__link" href="#">
            <img className="mmo__img" src={thumbnail} alt="" />
            <div className="mmo__disc">{title}</div>
          </a>
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
            <div className="mmo__title">EXPLORE MMO GAMES</div>
            <div className="mmo__btn">
              <a href="">browse all </a>
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
