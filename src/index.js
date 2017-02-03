import React, {Component} from 'react';
import {App as AppOrigin} from 'whs';

class TransitionBase extends Component {
  defer = [];

  deferParent(func) {
    this.defer.push(func);
  }

  wrapChild(child) {
    return React.cloneElement(child, {
      parent: this.native,
      onParentMount: this.deferParent.bind(this)
    });
  }

  applyChildren() {
    const children = this.props.children;

    if (children && children.length > 0) return children.map(child => this.wrapChild(child));
    else if (children) return this.wrapChild(children);
    else return null;
  }

  mount() {
    if (this.props.onParentMount && this.props.parent) {
      console.log(this.props.parent);
      this.props.onParentMount(() => this.props.parent.add(this.native));
    }

    this.defer.forEach(func => func());
  }
}

export class App extends TransitionBase {
  constructor(...props) {
    super(...props);

    this.native = new AppOrigin();
    this.native.start();
  }

  componentDidMount() {
    const element = this.refs.whscontainer;
    this.native.manager.add('element', element, {alias: '$element'});

    this.props.modules.forEach(module => {
      this.native.applyModule(module);
    });

    this.mount();
  }

  render() {
    return (
      <div className='whs' ref='whscontainer'>
        {this.applyChildren()}
      </div>
    )
  }
}

export function R(component) {
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
