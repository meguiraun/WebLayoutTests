/** @jsx React.DOM */
var SampleCentring = React.createClass({displayName: "SampleCentring",
	getInitialState: function () {
      return {
          sampleName: 'Sample_42'
      }
    },

  componentWillMount: function(){
  },
  aMethod: function(){
      console.log('aMethod Called')  
  },
  render: function () {
      return (
        React.createElement("div", {className: "col-md-12"}, 
            React.createElement("div", {className: "panel panel-primary text-center"}, 
                React.createElement("div", {className: "panel-heading"}, 
                    React.createElement("h3", {className: "panel-title"}, "Sample Centring")
                ), 
                React.createElement("div", {className: "panel-body"}, 
                    React.createElement("img", {src: "/Users/mikegu/Desktop/md2.jpg", className: "center-block img-responsive"}, " "), 
                    React.createElement("hr", null), 
                    React.createElement("div", {className: "panel panel-info"}, 
                        React.createElement("div", {className: "panel-heading"}, 
                            React.createElement("h3", {className: "panel-title"}, "Controls")
                        ), 
                        React.createElement("div", {className: "panel-body"}, 
                            React.createElement("a", {href: "#"}, React.createElement("i", {className: "fa fa-2x fa-fw fa-save"})), 
                            React.createElement("a", {href: "#"}, React.createElement("i", {className: "fa fa-2x fa-fw fa-calculator"})), 
                            React.createElement("a", {href: "#"}, React.createElement("i", {className: "fa fa-2x fa-fw fa-arrows-v"})), 
                            React.createElement("a", {href: "#"}, React.createElement("i", {className: "fa fa-2x fa-fw fa-camera"})), 
                            React.createElement("a", {href: "#"}, React.createElement("i", {className: "fa fa-2x fa-fw fa-arrows"})), 
                            React.createElement("a", {href: "#"}, React.createElement("i", {className: "fa fa-2x fa-fw fa-rotate-right"}))
                        )
                    ), 
                    React.createElement(SingleSampleTree, null), 
                    React.createElement(ExperimentConfiguration, null)
                    )
                )
        )
            );        
  },
});
React.render(React.createElement(SampleCentring, null), document.getElementById('SampleCentringHere'));


