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
    const {
      modules,
      afterMount,
      afterMountParams,
      passAppToView
    } = this.props;

    this.native.manager.add('element', this.element, {alias: '$element'});

    modules.forEach(module => {
      this.native.applyModule(module);
    });

    passAppToView(this);
    this.mount();
    if (afterMount) afterMount.bind(this)(afterMountParams);
  }

  render() {
    const Parent = this.props.parent;

    return (
      <Parent style={{flex: 1}} className='whs' ref={ref => {this.element = ref}}>
        {this.applyChildren()}
      </Parent>
    )
  }
}
