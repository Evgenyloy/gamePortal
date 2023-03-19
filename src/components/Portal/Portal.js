import ReactDOM from 'react-dom';
import { Component } from 'react';

class Portal extends Component {
  constructor(props) {
    super(props);
    this.node = document.createElement('div');
  }

  componentDidMount() {
    document.body.appendChild(this.node);
  }

  componentWillUnmount() {
    this.node.remove();
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.node);
  }
}

export default Portal;
