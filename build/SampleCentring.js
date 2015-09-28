/** @jsx React.DOM */
// var React = require('react');
// var SingleSampleTree = require('./SampleImaging.js');
var params = { Characterisation : { 
                        osc_range: { label: "Oscillation range", default_value: 0.1 },
                        osc_start: { label: "Oscillation start", default_value: 0 },
                        exp_time: { label: "Exposure time", default_value: 0.02 },
                        n_images: { label: "Number of images", default_value: 1 } } ,
              StandardCollection : { 
                        osc_range: { label: "Oscillation range", default_value: 0.1 },
                        osc_start: { label: "Oscillation start", default_value: 0 },
                        exp_time: { label: "Exposure time", default_value: 0.02 }, 
                        n_images: { label: "Number of images", default_value: 1 } },
              SampleCentring : { 
                        center_points: { label: "Centring status", default_value: "False" },
                        n_images: { label: "Number of images", default_value: 1 } } 
                      }
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

var SingleSampleTree = React.createClass({displayName: "SingleSampleTree",
  getInitialState: function () {
      return {
          list: ['Characterisation', 'SampleCentring', 'StandardCollection'],
          sampleName: 'Sample_42'  
      }
    },
  componentWillMount: function(){
      this.getInitialState()    
  },
  aMethod: function(){
      console.log('aMethod Called')  
  },
  formatParameters: function(paramType){
    var fields = [];
      var paramDict = params[paramType]
      for (var key in paramDict) {
          var value = paramDict[key]['default_value'];
          var name = paramDict[key]['label'];
          console.log(key)
          console.log(value)
          fields.push( React.createElement(EditableField, {name: name, value: value}) );
      }
    console.log(fields)
    return fields
  },
  render: function() {
    this.getInitialState()
    //new style so the buttons does not mess because of the small margin between list items
    var listStyle = {
      marginTop: '8px'
    };
    console.log(this.state.list)
    var that = this
    return (  
      React.createElement("div", {className: "panel panel-info"}, 
        React.createElement("div", {className: "panel-heading"}, 
          React.createElement("h1", {className: "panel-title"}, "Queue")
        ), 
        React.createElement("div", {className: "panel-body"}, 

              React.createElement("div", {className: "col-md-7"}, 
                 React.createElement("b", null, "Sample_42"), 

                React.createElement("ul", {className: "lead list"}, 

                React.createElement("ol", {className: "text-left"}, 
                    this.state.list.map(function(listValue){
                     return React.createElement("li", {style: listStyle}, " ", React.createElement("a", {"data-toggle": "collapse", href: "#collapse"+listValue}, " ", listValue, " "), React.createElement("button", {type: "button", className: "btn btn-link  pull-right", onClick: that.aMethod}, React.createElement("i", {className: "fa fa-fw fa-circle-o"})), 
                    React.createElement("button", {type: "button", className: "btn btn-link  pull-right", onClick: that.aMethod}, React.createElement("i", {className: "fa fa-fw fa-play-circle"})), 
                    React.createElement("button", {type: "button", className: "btn btn-link  pull-right", onClick: that.aMethod}, React.createElement("i", {className: "fa fa-fw fa-eraser"})), 
                       React.createElement("div", {className: "collapse", id: "collapse"+listValue}, 
                          React.createElement("div", {className: "well"}, 
                              that.formatParameters(listValue)
                          )
                        )
                       );
                    })
                )
                )
      ), 
           React.createElement("div", {className: "col-md-2"}, 
                React.createElement("hr", null), 
                React.createElement("a", {className: "btn btn-block btn-primary"}, "Run  ", React.createElement("i", {className: "fa fa-play-circle fa-fw"})), 
                React.createElement("a", {className: "btn btn-block btn-primary"}, "Stop  ", React.createElement("i", {className: "fa fa-stop fa-fw"}))
          )
  )
)
)
},
});
var EditableField = React.createClass({displayName: "EditableField",
  
   componentDidMount: function() {
      $(this.refs.editable.getDOMNode()).editable();
   }, 

   render: function() {
       return React.createElement("p", null, this.props.name, ": ", React.createElement("a", {href: "#", ref: "editable", "data-name": this.props.name, "data-pk": this.props.id, "data-url": "/beam_line_update", "data-type": "text", "data-title": "Edit value"}, this.props.value))
   } 
})              

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


