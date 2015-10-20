/** @jsx React.DOM */
var MainView = React.createClass({displayName: "MainView",

	getInitialState: function () {
      return {
          progressbarStyle : { width: "42%"  }
      }
    },

  componentWillMount: function(){
  },
  componentDidMount: function(){
      this.anotherMethod()
  },
  anotherMethod: function(){
      this.setState({ progressbarStyle : { width: "100%"  } })
  },
  render: function () {

      return (
  React.createElement("div", null, 
    React.createElement("div", {className: "navbar navbar-default navbar-static-top"}, 
      React.createElement("div", {className: "container"}, 
        React.createElement("div", {className: "navbar-header"}, 
          React.createElement("button", {type: "button", className: "navbar-toggle", "data-toggle": "collapse", "data-target": "#navbar-ex-collapse"}, 
            React.createElement("span", {className: "sr-only"}, "Toggle navigation"), 
            React.createElement("span", {className: "icon-bar"}), 
            React.createElement("span", {className: "icon-bar"}), 
            React.createElement("span", {className: "icon-bar"})
          ), 
          React.createElement("a", {className: "navbar-brand", href: "http://mxcube.github.io/mxcube/"}, React.createElement("img", {height: "20", alt: "Brand", src: "./build/css/mxcube_logo.png"}, " "))
        ), 
        React.createElement("div", {className: "collapse navbar-collapse", id: "navbar-ex-collapse"}, 
          React.createElement("ul", {className: "nav navbar-nav navbar-right"}, 
            React.createElement("li", {className: "active"}, 
              React.createElement("a", {href: "#"}, "Home")
            ), 
            React.createElement("li", null, 
              React.createElement("a", {href: "#"}, "Contacts")
            )
          ), 
          React.createElement("p", {className: "navbar-left navbar-text"}, "Signed in as Patxi"), 
          React.createElement("a", {className: "btn btn-default navbar-btn"}, "Log out")
        )
      )
    ), 
    React.createElement("div", {className: "col-md-12"}, 
            React.createElement("ul", {className: "pager"}, 
              React.createElement("li", {className: "previous"}, 
                React.createElement("a", {href: "#"}, "←  Back to sample list")
              ), 
              React.createElement("li", {className: "next"}, 
                React.createElement("a", {href: "#"}, "Next Sample  →")
              )
            )
    ), 
    React.createElement("div", {className: "col-md-10"}, 
            React.createElement("div", {className: "col-md-12"}, 
              React.createElement("div", {className: "panel panel-primary text-center"}, 
                React.createElement("div", {className: "panel-heading"}, 
                  React.createElement("h8", {className: "panel-title text-center"}, "Sample Experiment Control")
                ), 
                React.createElement("div", {className: "panel-body"}, 
                  React.createElement(SampleMain, null)
                )
              )
            )
          ), 
    React.createElement("div", {className: "col-md-2"}, 
            React.createElement("div", {className: "panel panel-primary"}, 
              React.createElement("div", {className: "panel-heading"}, 
                React.createElement("h3", {className: "panel-title"}, "Whatever goes here")
              ), 
              React.createElement("div", {className: "panel-body"}, 
                React.createElement("p", {contentEditable: "true"}, "Panel content")
              )
            )
          ), 

        React.createElement("div", {className: "section"}, 
    React.createElement("div", {className: "container"}, 
        React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "col-md-12"}, 
            React.createElement("div", {className: "active progress progress-striped"}, 
              React.createElement("div", {className: "progress-bar", id: "progressBar", role: "progressbar", style: this.state.progressbarStyle}, "42% of Samples Collected")
            )
          )
        )
      )
    )
  )
     );
  },
});

React.render(React.createElement(MainView, null), document.getElementById('SampleCentringHere'));
