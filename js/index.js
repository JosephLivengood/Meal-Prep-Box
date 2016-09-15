"use strict";

var Panel = ReactBootstrap.Panel,
    Accordion = ReactBootstrap.Accordion;
var Button = ReactBootstrap.Button,
    Input = ReactBootstrap.Input;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var Modal = ReactBootstrap.Modal;
var OverlayTrigger = ReactBootstrap.OverlayTrigger;
var ListGroup = ReactBootstrap.ListGroup,
    ListGroupItem = ReactBootstrap.ListGroupItem;

var recipes = typeof localStorage["_Livengood_Meals"] != "undefined" ? JSON.parse(localStorage["_Livengood_Meals"]) : [{ title: "Paleo Toast", ingredients: ["Steak Break", "Grill"], imgf: "http://www.jpband.com/wp-content/uploads/2009/10/toast.jpg" }, { title: "Low-carb Pasta", ingredients: ["Air noodles", "Water", "Meat"], imgf: "#" }],
    globalTitle = "",
    globalIngredients = [],
    globalImgf = "";

var RecipeBook = React.createClass({
  displayName: "RecipeBook",

  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        Accordion,
        null,
        this.props.data
      )
    );
  }
});

var Recipe = React.createClass({
  displayName: "Recipe",

  remove: function remove() {
    recipes.splice(this.props.index, 1);
    update();
  },
  edit: function edit() {
    globalTitle = this.props.title;
    globalIngredients = this.props.ingredients;
    globalImgf = this.props.imgf;
    document.getElementById("show").click();
  },
  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement("img", { src: this.props.imgf, alt: this.props.title }),
      React.createElement(
        "h4",
        { className: "text-center" },
        "Ingredients"
      ),
      React.createElement("hr", null),
      React.createElement(IngredientList, { ingredients: this.props.ingredients }),
      React.createElement(
        ButtonToolbar,
        null,
        React.createElement(
          Button,
          { "class": "delete", bsStyle: "danger", id: "btn-del" + this.props.index, onClick: this.remove },
          "Delete"
        ),
        React.createElement(
          Button,
          { bsStyle: "default", id: "btn-edit" + this.props.index, onClick: this.edit },
          "Edit"
        )
      )
    );
  }
});

var IngredientList = React.createClass({
  displayName: "IngredientList",

  render: function render() {
    var ingredientList = this.props.ingredients.map(function (ingredient) {
      return React.createElement(
        ListGroupItem,
        null,
        ingredient
      );
    });
    return React.createElement(
      ListGroup,
      null,
      ingredientList
    );
  } });

// RecipeAdd class. This contains the Modal and Add Recipe button
var RecipeAdd = React.createClass({
  displayName: "RecipeAdd",

  getInitialState: function getInitialState() {
    return { showModal: false };
  },
  close: function close() {
    globalTitle = "";
    globalIngredients = [];
    globalImgf = "";
    this.setState({ showModal: false });
  },
  open: function open() {
    this.setState({ showModal: true });
    if (document.getElementById("title") && document.getElementById("ingredients")) {
      $("#title").val(globalTitle);
      $("#ingredients").val(globalIngredients);
      $("#imgf").val(globalImgf);
      if (globalTitle != "") {
        $("#modalTitle").text("Edit Recipe");
        $("#addButton").text("Edit Recipe");
      }
    } else requestAnimationFrame(this.open);
  },
  add: function add() {
    var title = document.getElementById("title").value;
    var ingredients = document.getElementById("ingredients").value.split(",");
    var exists = false;
    for (var i = 0; i < recipes.length; i++) {
      if (recipes[i].title === title) {
        recipes[i].ingredients = ingredients;
        exists = true;
        break;
      }
    }
    if (!exists) {
      if (title.length < 1) title = "Untitled";
      recipes.push({ title: title, ingredients: document.getElementById("ingredients").value.split(",") });
    }
    update();
    this.close();
  },
  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        Button,
        {
          bsStyle: "primary",
          bsSize: "large",
          onClick: this.open,
          id: "show"
        },
        "Add Recipe"
      ),
      React.createElement(
        Modal,
        { show: this.state.showModal, onHide: this.close },
        React.createElement(
          Modal.Header,
          { closeButton: true },
          React.createElement(
            Modal.Title,
            { id: "modalTitle" },
            "Add a Recipe"
          )
        ),
        React.createElement(
          Modal.Body,
          null,
          React.createElement(
            "form",
            null,
            React.createElement(Input, { type: "text", label: "Recipe", placeholder: "Recipe Name", id: "title" }),
            React.createElement(Input, { type: "textarea", label: "Ingredients", placeholder: "Enter Ingredients,Separated,By Commas", id: "ingredients" })
          )
        ),
        React.createElement(
          Modal.Footer,
          null,
          React.createElement(
            Button,
            { onClick: this.add, bsStyle: "primary", id: "addButton" },
            "Add Recipe"
          ),
          React.createElement(
            Button,
            { onClick: this.close },
            "Close"
          )
        )
      )
    );
  }
});

// Update function to display all the recipes
function update() {
  localStorage.setItem("_Livengood_Meals", JSON.stringify(recipes));
  var rows = [];
  for (var i = 0; i < recipes.length; i++) {
    rows.push(React.createElement(
      Panel,
      { header: recipes[i].title, eventKey: i, bsStyle: "success" },
      React.createElement(Recipe, { title: recipes[i].title, ingredients: recipes[i].ingredients, imgf: recipes[i].imgf, index: i })
    ));
  }
  ReactDOM.render(React.createElement(RecipeBook, { data: rows }), document.getElementById("container"));
}

ReactDOM.render(React.createElement(RecipeAdd, null), document.getElementById("button"));
update();

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

var PageContent = React.createClass({
  displayName: "PageContent",

  render: function render() {
    return React.createElement(
      "div",
      { className: "pagecontent" },
      React.createElement(Heading, null)
    );
  }
});

ReactDOM.render(React.createElement(PageContent, null), document.getElementById("content"));