import React from 'react';
import {App as AppOrigin} from 'whs';
import {TransitionBase} from './TransitionBase';

export class App extends TransitionBase {
  static defaultProps = {
    start: true,
    parent: 'div',
    parentStyle: {flex: 1}
  };

  constructor(...props) {
    super(...props);

    const {refApp, start} = this.props;

    this.native = new AppOrigin();
    if (start) this.native.start();
    if (refApp) refApp(this.native);
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

    if (passAppToView) passAppToView(this);
    this.mount();
    if (afterMount) afterMount.bind(this)(afterMountParams);
  }

  render() {
    const {parent: Parent, parentStyle} = this.props;

    return (
      <Parent style={parentStyle} className='whs' ref={ref => {this.element = ref}}>
        {this.applyChildren()}
      </Parent>
    )
  }
}
