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
      handleRenderView
    } = this.props;

    this.native.manager.add('element', this.element, {alias: '$element'});

    modules.forEach(module => {
      this.native.applyModule(module);
    });

    this.mount();

    if (afterMount) afterMount.bind(this)(afterMountParams);
    if (handleRenderView) handleRenderView(this);
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
