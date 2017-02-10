import React from 'react';
import {App as AppOrigin} from 'whs';
import {TransitionBase} from './TransitionBase';

export class App extends TransitionBase {
  static defaultProps = {
    start: true,
    parent: 'div'
  };

  constructor(...props) {
    super(...props);

    this.native = new AppOrigin();
    if (this.props.start) this.native.start();
  }

  componentDidMount() {
    this.native.manager.add('element', this.element, {alias: '$element'});

    this.props.modules.forEach(module => {
      this.native.applyModule(module);
    });

    this.mount();

    if (this.props.afterMount) this.props.afterMount.bind(this)(this.props.afterMountParams);
  }

  render() {
    const Parent = this.props.parent;

    return (
      <Parent className='whs' ref={ref => {this.element = ref}}>
        {this.applyChildren()}
      </Parent>
    )
  }
}
