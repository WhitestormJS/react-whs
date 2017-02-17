import React, {Component} from 'react';

export class TransitionBase extends Component {
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
    if (this.props.onParentMount && this.props.parent)
      this.props.onParentMount(() => this.props.parent.add(this.native));

    this.defer.forEach(func => func());
  }
}
