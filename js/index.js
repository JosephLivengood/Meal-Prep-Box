"use strict";

var HelloWorld = React.createClass({
  displayName: "HelloWorld",

  render: function render() {
    return React.createElement(
      "div",
      null,
      "Hello, Livengood!"
    );
  }
});

var Heading = React.createClass({
  displayName: "Heading",

  render: function render() {
    return React.createElement(
      "div",
      { className: "heading" },
      React.createElement(
        "h1",
        null,
        "Meal Prep Box"
      )
    );
  }
});

var PageContent = React.createClass({
  displayName: "PageContent",

  render: function render() {
    return React.createElement(
      "div",
      { className: "pagecontent" },
      React.createElement(Heading, null),
      React.createElement(HelloWorld, null)
    );
  }
});

ReactDOM.render(React.createElement(PageContent, null), document.getElementById("content"));