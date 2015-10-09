/** @jsx React.DOM */

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
      ///status: 0 not done, 1 done, 2 failed
      return {
          list: [{name: 'SampleCentring_1', status: 0, params:{}}, {name: 'Characterisation_1', status: 1, params:{}}, {name : 'SampleCentring_1', status: 0, params:{}}, {name: 'StandardCollection_1', status: 2, params:{}}],
          sampleName: 'Sample_42'  
      }
    },

  addQueueItem: function(newItem){
    var auxList = this.state.list
    auxList.push({name :this.generateElementId(newItem['kind']), status:0, params:{}})
    this.setState({list: auxList})
  },
  removeQueueItem: function(itemToRemove){
    console.log(itemToRemove)
    var auxList = this.state.list
    var index = auxList.indexOf(itemToRemove)
    auxList.splice(index, 1)
    this.setState({list: auxList})
  },
  runThisItem: function(item){
    console.log(item)

  },
  componentWillMount: function(){
    window.app_dispatcher.on("queue:new_item", this.addQueueItem);
    this.getInitialState()    
  },
  componentWillUnMount: function() {
    window.app_dispatcher.off("queue:new_item", this.addQueueItem);
  },
  aMethod: function(){
      console.log('aMethod Called')  
  },
  formatParameters: function(paramType){
    var fields = [];
    //fields.push( <EditableField key={fieldno} sampleid={this.props.sample.sampleId} name={field} value={value} /> );
      var paramDict = params[paramType.split('_')[0]]
      for (var key in paramDict) {
          var value = paramDict[key]['default_value'];
          var name = paramDict[key]['label'];
          fields.push( React.createElement(EditableField, {name: name, value: value}) );
      }
    return fields
  },
  formatStatus: function(status){
    switch (status){
      case 0: return "fa fa-fw fa-circle-o";
      case 1: return "fa fa-fw fa-check-circle-o";
      case 2: return "fa fa-fw fa-exclamation-circle";
    }
  },
  generateElementId: function(newElement){
    var occurrences = 0
    for (i = 0; i < this.state.list.length; i++){

      if (this.state.list[i].name.split('_')[0]==newElement){
          occurrences +=1
      }  
    }
    return newElement+'_'+(occurrences+1)
  },
  render: function() {
    this.getInitialState()
    //new style so the buttons does not mess because of the small margin between list items
    var listStyle = {
      marginTop: '8px'
    };
    console.log('rendering')
    var that = this
    var arr = []
    for (key in this.state.list){
      arr.push(this.state.list[key])
    }
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
                          arr.map(function(listValue){
                              return React.createElement("li", {style: listStyle}, " ", React.createElement("a", {"data-toggle": "collapse", href: "#collapse"+listValue['name']}, " ", listValue['name'], " "), 
                                React.createElement("button", {type: "button", className: "btn btn-link  pull-right", onClick: that.aMethod}, React.createElement("i", {
                                  className: that.formatStatus(listValue['status'])})), 
                                React.createElement("button", {type: "button", className: "btn btn-link  pull-right", onClick: that.runThisItem.bind(that,listValue['name'])}, React.createElement("i", {className: "fa fa-fw fa-play-circle"})), 
                                React.createElement("button", {type: "button", className: "btn btn-link  pull-right", onClick: that.removeQueueItem.bind(that,listValue['name'])}, React.createElement("i", {className: "fa fa-fw fa-eraser"})), 
                                 React.createElement("div", {className: "collapse", id: "collapse"+listValue['name']}, 
                                    React.createElement("div", {className: "well"}, 
                                        that.formatParameters(listValue['name'])
                                    )
                                  )
                                 );
                              })
                      )
                  )
              ), 
              React.createElement("div", {className: "col-md-2"}, 
                    React.createElement("hr", null), 
                    React.createElement("a", {className: "btn btn-block btn-primary", onClick: this.aMethod}, "Run  ", React.createElement("i", {className: "fa fa-play-circle fa-fw"})), 
                    React.createElement("a", {className: "btn btn-block btn-primary", onClick: this.aMethod}, "Stop  ", React.createElement("i", {className: "fa fa-stop fa-fw"}))
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
//React.render(<SingleSampleTree/>, document.getElementById('SingleSampleTree'));


