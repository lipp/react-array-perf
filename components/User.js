import React from 'react';

export const Functional = ({ name, age, hobby }) => (
  <div>
    <span>{name}</span>
    <span>{age}</span>
    <span>{hobby}</span>
  </div>
);

export class PureComponent extends React.PureComponent {
  render() {
    const { name, age, hobby } = this.props;
    return (
      <div>
        <span>{name}</span>
        <span>{age}</span>
        <span>{hobby}</span>
      </div>
    );
  }
}

export class Component extends React.Component {
  render() {
    const { name, age, hobby } = this.props;
    return (
      <div>
        <span>{name}</span>
        <span>{age}</span>
        <span>{hobby}</span>
      </div>
    );
  }
}
