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
      ),
      React.createElement(
        "p",
        null,
        "You have to eat right for the fat to take flight."
      )
    );
  }
});

var Landing = React.createClass({
  displayName: "Landing",

  render: function render() {
    return React.createElement(
      "div",
      { className: "landing" },
      React.createElement("div", { "class": "icon", id: "icon-with-animation" })
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
      React.createElement(Landing, null),
      React.createElement(HelloWorld, null)
    );
  }
});

ReactDOM.render(React.createElement(PageContent, null), document.getElementById("content"));