var HelloWorld = React.createClass({
  render: function(){
    return (
      <div>
        Hello, Livengood!
      </div>
    )
  }
});

ReactDOM.render(<HelloWorld />, document.getElementById('content'));
