import React, {Component} from 'react';
import {App} from 'whs';

export class RApp extends Component {
  constructor(...props) {
    super(...props);

    this.app = new App();
    this.app.start();
    this.defer = [];
  }

  deferParent(func) {
    this.defer.push(func);
  }

  componentDidMount() {
    const element = this.refs.whscontainer;
    this.app.manager.add('element', element, {alias: '$element'});

    this.props.modules.forEach(module => {
      this.app.applyModule(module);
    });

    if (this.props.children && this.props.children.length > 0) {
      this.props.children.forEach(child => {
        this.app.add(child.component);
      });
    } else if (this.props.children) {
      console.log(this.props.children);
      // this.app.add(this.props.children.component);
    }

    this.defer.forEach(func => func());
    console.log(this.app);
  }

  render() {
    return (
      <div className='whs' ref='whscontainer'>
        {this.props.children ? React.cloneElement(this.props.children, {
          parent: this.app,
          onParentMount: this.deferParent.bind(this)
        }) : null}
      </div>
    )
  }
}

export function R(component) {
  return class extends Component {
    constructor(...props) {
      super(...props);
      this.component = new component(Object.assign({}, this.props));
    }

    render() {
      return null;
    }

    componentDidMount() {
      this.props.onParentMount(() => this.props.parent.add(this.component));
    }
  }
}
