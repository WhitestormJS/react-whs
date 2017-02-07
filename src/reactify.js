import React from 'react';
import {TransitionBase} from './TransitionBase';

export function reactify(component) {
  return class extends TransitionBase {
    constructor(...props) {
      super(...props);
      this.native = new component(Object.assign({}, this.props));
    }

    render() {
      return this.applyChildren();
    }

    componentDidMount() {
      this.mount();
    }
  }
}
