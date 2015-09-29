/** @jsx React.DOM */

var ExperimentConfiguration = React.createClass({displayName: "ExperimentConfiguration",
  render: function(){
    return (React.createElement("div", {className: "panel panel-info"}, 
                      React.createElement("div", {className: "panel-heading"}, 
                        React.createElement("h3", {className: "panel-title"}, "Experiment Configuration")
                      ), 
                      React.createElement("div", {className: "panel body"}, 
                        React.createElement("p", null, "Add collection method"), 
                        React.createElement("a", {className: "btn btn-primary"}, React.createElement("i", {className: "fa fa-fw fa-plus-square"}), "Characterisation"), 
                        React.createElement("a", {className: "btn btn-primary"}, React.createElement("i", {className: "fa fa-fw fa-plus-square"}), "Standard Collection"), 
                        React.createElement("div", {className: "btn-group"}, 
                          React.createElement("a", {className: "btn btn-primary dropdown-toggle", "data-toggle": "dropdown"}, React.createElement("span", {className: "fa fa-caret-down"}), " Advanced "), 
                          React.createElement("ul", {className: "dropdown-menu", role: "menu"}, 
                            React.createElement("li", null, 
                              React.createElement("a", {href: "#"}, "Helical")
                            ), 
                            React.createElement("li", null, 
                              React.createElement("a", {href: "#"}, "Mesh")
                            ), 
                            React.createElement("li", null, 
                              React.createElement("a", {href: "#"}, "Fancy Method")
                            )
                          )
                        )
                      )
                    )
    )
  },
});