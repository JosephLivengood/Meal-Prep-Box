'use strict';

var HelloWorld = React.createClass({
  displayName: 'HelloWorld',

  render: function render() {
    return React.createElement(
      'div',
      null,
      'Hello, Livengood!'
    );
  }
});

ReactDOM.render(React.createElement(HelloWorld, null), document.getElementById('content'));