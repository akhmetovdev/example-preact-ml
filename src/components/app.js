import { h, Component } from 'preact';
import Home from '../routes/home';

export default class App extends Component {
  render() {
    return (
      <div id="app">
        <Home />
      </div>
    );
  }
}
