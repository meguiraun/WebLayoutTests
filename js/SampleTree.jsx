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
var SingleSampleTree = React.createClass({

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
          fields.push( <EditableField name={name} value={value} /> );
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
    var that = this
    return (	
      <div className="panel panel-info">
          <div className="panel-heading">
              <h1 className="panel-title">Queue</h1>
          </div>
          <div className="panel-body">
              <div className="col-md-7">
                  <b>Sample_42</b>
                  <ul className="lead list">
                  <ol className="text-left" >
                          {this.state.list.map(function(listValue){
                              return <li style={listStyle}> <a data-toggle="collapse" href={"#collapse"+listValue} > {listValue} </a><button type="button" className="btn btn-link  pull-right" onClick={that.aMethod}><i className="fa fa-fw fa-circle-o"></i></button>
                                <button type="button" className="btn btn-link  pull-right" onClick={that.aMethod}><i className="fa fa-fw fa-play-circle"></i></button>
                                <button type="button" className="btn btn-link  pull-right" onClick={that.aMethod}><i className="fa fa-fw fa-eraser"></i></button>  
                                 <div className="collapse" id={"collapse"+listValue}>
                                    <div className="well">
                                        {that.formatParameters(listValue)}
                                    </div>
                                  </div>
                                 </li>;
                              })}
                      </ol>
                  </ul>
              </div>
              <div className="col-md-2">
                    <hr></hr>
                    <a className="btn btn-block btn-primary">Run  <i className="fa fa-play-circle fa-fw"></i></a>
                    <a className="btn btn-block btn-primary">Stop  <i className="fa fa-stop fa-fw"></i></a>
              </div>      
        </div>
      </div>
)
},
});
var EditableField = React.createClass({
  
   componentDidMount: function() {
      $(this.refs.editable.getDOMNode()).editable();
   }, 

   render: function() {
       return <p>{this.props.name}: <a href="#" ref="editable"  data-name={this.props.name} data-pk={this.props.id} data-url="/beam_line_update" data-type="text" data-title="Edit value">{this.props.value}</a></p>
   } 
})
//React.render(<SingleSampleTree/>, document.getElementById('SingleSampleTree'));


