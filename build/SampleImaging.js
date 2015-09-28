/** @jsx React.DOM */

var discrete_params = { osc_range: { label: "Oscillation range", default_value: 0.1 },
                        osc_start: { label: "Oscillation start", default_value: 0 },
                        exp_time: { label: "Exposure time", default_value: 0.02 },
                        n_images: { label: "Number of images", default_value: 1 } } ;
var characterisation_params = { osc_range: { label: "Oscillation range", default_value: 0.1 },
                        osc_start: { label: "Oscillation start", default_value: 0 },
                        exp_time: { label: "Exposure time", default_value: 0.02 },
                        n_images: { label: "Number of images", default_value: 1 } } ;
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
    //fields.push( <EditableField key={fieldno} sampleid={this.props.sample.sampleId} name={field} value={value} /> );
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
    var data = 12345.6789//<div>Oscilattion dfdsf : "3453"</div>

    // var buttonRow = "<button type="button" className="btn btn-link  pull-right" onClick={this.aMethod}><i className="fa fa-fw fa-circle-o"></i></button>
    //                 <button type="button" className="btn btn-link  pull-right" onClick={this.aMethod}><i className="fa fa-fw fa-play-circle"></i></button>
    //                 <button type="button" className="btn btn-link  pull-right" onClick={this.aMethod}><i className="fa fa-fw fa-eraser"></i></button>"
    console.log(this.state.list)
    var that = this
    return (	
      React.createElement("div", {className: "panel panel-info"}, 
        React.createElement("div", {className: "panel-heading"}, 
          React.createElement("h1", {className: "panel-title"}, "Queue")
        ), 
        React.createElement("div", {className: "panel-body"}, 
              React.createElement("div", {className: "col-md-7"}, 
                React.createElement("ul", {className: "lead list"}, 
                React.createElement("li", null, 
                  React.createElement("b", null, "Sample_42")
                ), 
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
React.render(React.createElement(SingleSampleTree, null), document.getElementById('SingleSampleTree'));
// module.exports = SingleSampleTree;
