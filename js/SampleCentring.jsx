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
var ExperimentConfiguration = React.createClass({
  render: function(){
    return (<div className="panel panel-info">
                      <div className="panel-heading">
                        <h3 className="panel-title">Experiment Configuration</h3>
                      </div>
                      <div className="panel body">
                        <p>Add collection method</p>
                        <a className="btn btn-primary"><i className="fa fa-fw fa-plus-square"></i>Characterisation</a>
                        <a className="btn btn-primary"><i className="fa fa-fw fa-plus-square"></i>Standard Collection</a>
                        <div className="btn-group">
                          <a className="btn btn-primary dropdown-toggle" data-toggle="dropdown"><span className="fa fa-caret-down"></span> Advanced </a>
                          <ul className="dropdown-menu" role="menu">
                            <li>
                              <a href="#">Helical</a>
                            </li>
                            <li>
                              <a href="#">Mesh</a>
                            </li>
                            <li>
                              <a href="#">Fancy Method</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
    )
  },
});

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
    console.log(this.state.list)
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

var SampleCentring = React.createClass({
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
        <div className="col-md-12">
        <div className="panel panel-primary text-center">
              <div className="panel-heading">
                  <h3 className="panel-title">Sample Centring</h3>
              </div>
              <div className="panel-body">
                  <img src="/Users/mikegu/Desktop/md2.jpg" className="center-block img-responsive"> </img>
                  <hr></hr>
                  <div className="panel panel-info">
                      <div className="panel-heading">
                          <h3 className="panel-title">Controls</h3>
                      </div>
                      <div className="panel-body">
                          <a href="#"><i className="fa fa-2x fa-fw fa-save"></i></a>
                          <a href="#"><i className="fa fa-2x fa-fw fa-calculator"></i></a>
                          <a href="#"><i className="fa fa-2x fa-fw fa-arrows-v"></i></a>
                          <a href="#"><i className="fa fa-2x fa-fw fa-camera"></i></a>
                          <a href="#"><i className="fa fa-2x fa-fw fa-arrows"></i></a>
                          <a href="#"><i className="fa fa-2x fa-fw fa-rotate-right"></i></a>
                      </div>
                  </div>
              <SingleSampleTree/>
              <ExperimentConfiguration/>
                  </div>
        </div>
        </div>
            );        
  },
});
React.render(<SampleCentring/>, document.getElementById('SampleCentringHere'));


