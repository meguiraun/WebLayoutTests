/** @jsx React.DOM */
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
  lightOnOff: function(){

  },
  moveMotor: function(){

  },
  takeSnapshot: function(){

  },
  addCentringPoint: function(){

  },
  startCentring: function(){

  },
  measureDistance: function(){

  },
  getBeamPosition: function(){

  },
  componentDidMount: function(){
  },
  render: function () {
      return (
                <div>
                    <img src="/Users/mikegu/Desktop/md2.jpg" className="center-block img-responsive"> </img>
                    <hr></hr>
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h3 className="panel-title">Controls</h3>
                        </div>
                        <div className="panel-body">
                            <button type="button" className="btn btn-link  pull-center" onClick={this.aMethod}><i className="fa fa-2x fa-fw fa-save"></i></button>                            
                            <button type="button" className="btn btn-link  pull-center" onClick={this.aMethod}><i className="fa fa-2x fa-fw fa-calculator"></i></button>                              
                            <button type="button" className="btn btn-link  pull-center" onClick={this.aMethod}><i className="fa fa-2x fa-fw fa-arrows-v"></i></button>                            
                            <button type="button" className="btn btn-link  pull-center" onClick={this.aMethod}><i className="fa fa-2x fa-fw fa-camera"></i></button>                            
                            <button type="button" className="btn btn-link  pull-center" onClick={this.aMethod}><i className="fa fa-2x fa-fw fa-arrows"></i></button>                          
                            <button type="button" className="btn btn-link  pull-center" onClick={this.aMethod}><i className="fa fa-2x fa-fw fa-rotate-right"></i></button>
                            <button type="button" className="btn btn-link  pull-center" onClick={this.aMethod}><i className="fa fa-2x fa-fw fa-lightbulb-o"></i></button>
                            <div class="input-group">
                              <span class="input-group-addon" id="basic-addon1">Kappa   </span>
                              <input type="number" step="0.01" min='0'  class="form-control" placeholder="kappa" aria-describedby="basic-addon1"> </input>
                              <span class="input-group-addon" id="basic-addon1">Omega   </span>
                              <input type="number" step="0.01" min='0' class="form-control" placeholder="omega" aria-describedby="basic-addon1"> </input>
                              <span class="input-group-addon" id="basic-addon1">Phi   </span>
                              <input type="number" step="0.01" min='0'  class="form-control" placeholder="Phi" aria-describedby="basic-addon1"> </input>
                            </div>
                        </div>
                    </div>
                    <SingleSampleTree/>
                    <ExperimentConfiguration/>
                </div>
            );        
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

