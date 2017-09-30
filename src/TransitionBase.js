import React, {Component} from 'react';

export class TransitionBase extends Component {
  defer = [];
  mounted = false;

  deferParent(func) {
    this.defer.push(func);
  }

  wrapChild(child) {
    return React.cloneElement(child, {
      parent: this,
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
    if (this.props.parent)
      if (this.props.parent.mounted)
        this.props.parent.native.add(this.native);
      else if (this.props.onParentMount)
        this.props.onParentMount(() => this.props.parent.native.add(this.native));

    this.defer.forEach(func => func());
    this.mounted = true;
  }

  unmount() {
    if (this.props.parent)
      this.props.parent.native.remove(this.native);
    
    this.mounted = false;
  }
}
