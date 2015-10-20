/** @jsx React.DOM */
var SampleMain = React.createClass({displayName: "SampleMain",
	getInitialState: function () {
      return {
          sampleName: 'Sample_42'
      }
    },

  componentWillMount: function(){
  },

  changeProgress: function(){
      var pBar = document.getElementById("progressBar")
      // pBar.style
  },
  render: function () {
      return (
        React.createElement("div", {className: "col-md-12"}, 
            React.createElement("div", {className: "panel panel-primary text-center"}, 
                React.createElement("div", {className: "panel-heading"}, 
                    React.createElement("h3", {className: "panel-title"}, "Sample Centring")
                ), 
               React.createElement("div", {className: "panel-body"}, 
                    React.createElement(SAMPLEVIEW_APP.SampleCentring, null)
                )
            )
        )
            );
  },
});
