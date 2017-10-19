import React from 'react';
import * as UserComponents from '../components/User';

const repeats = 400;
const arraySize = 200;

const getUsers = () =>
  Array(arraySize)
    .fill(1)
    .map((_, index) => ({
      name: 'John Doe',
      hobby: 'Painting',
      age: index === 0 ? Math.random() * 100 : 50 // efffectively only change first element
    }));

const componentsToTest = [
  'Functional',
  'PureComponent',
  'Component',
  'Functional', // run tests twice to reduce "warm up" impact
  'PureComponent',
  'Component'
];

export default class App extends React.Component {
  componentUnderTestIndex = -1;
  componentUnderTest = null;
  renderCount = -1;
  dts = {};

  state = {
    users: []
  };

  componentDidMount() {
    this.setState({ users: getUsers() });
  }

  componentDidUpdate() {
    ++this.renderCount;
    this.dt += Date.now() - this.startTime;
    if (this.renderCount % repeats === 0) {
      if (this.componentUnderTestIndex > -1) {
        this.dts[componentsToTest[this.componentUnderTestIndex]] = this.dt;
        console.log(
          'dt',
          componentsToTest[this.componentUnderTestIndex],
          this.dt
        );
      }
      ++this.componentUnderTestIndex;
      this.dt = 0;
      this.componentUnderTest = componentsToTest[this.componentUnderTestIndex];
    }
    if (this.componentUnderTest) {
      setTimeout(() => {
        this.startTime = Date.now();
        this.setState({ users: getUsers() });
      }, 0);
    } else {
      alert(`
        Render Performance ArraySize: ${arraySize} Repeats: ${repeats}
        Functional: ${this.dts.Functional} ms
        PureComponent: ${this.dts.PureComponent} ms
        Component: ${this.dts.Component} ms
      `);
    }
  }

  render() {
    if (!this.componentUnderTest) {
      return null;
    }
    return (
      <div>
        {this.state.users.map((user, index) => {
          const ComponentUnderTest = UserComponents[this.componentUnderTest];
          return <ComponentUnderTest {...user} key={index} />;
        })}
      </div>
    );
  }
}
