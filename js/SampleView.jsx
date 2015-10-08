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
  //only will send data when 'enter' key is pressed, the spinbox up/down fire the onInput event, as well as anything type in the box, so for setting 314.5 -> four event are sent. TODO: add event handling for the spin box, so a different filter is needed.
  push: function(id,data){
    console.log("push requested")
    $.ajax({
      url: '/mxcube/api/v0.1/samplecentring/'+id+'/move',
      data: {'moveable': id, 'position':data},
      type: 'PUT',
      success: function(res) {
          console.log(res);
        },
      error: function(error) {
        console.log(error);
        },
    });
    },
  isNumberKey: function(ev){
      var charCode = (ev.which) ? ev.which : event.keyCode
      //be carefull, ascii 46 = '.', but 47='/' and 48='0', a better filtering required
      if (charCode > 31 && (charCode < 46 || charCode > 57)){
            return false;}
      if (ev.key == "Enter"){
            this.push(ev.target.id,document.getElementById(ev.target.id).value)
      }
         return true;
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
                              <input type="number"  id="Kappa" step="0.01" min='0' max='360'  class="form-control" placeholder="kappa" aria-describedby="basic-addon1" onKeyPress={this.isNumberKey} onkeyup={this.isNumberKey}> </input>
                              <span class="input-group-addon" id="basic-addon2">Omega   </span>
                              <input type="number"   id="Omega" step="0.01" min='0' max='360'  class="form-control" placeholder="omega" aria-describedby="basic-addon2" intermediateChanges='true' onKeyPress={this.isNumberKey}> </input>
                              <span class="input-group-addon" id="basic-addon3">Phi   </span>
                              <input type="number"  id="Phi" step="0.01" min='0' max='360'   class="form-control" placeholder="Phi" aria-describedby="basic-addon3" onKeyPress={this.isNumberKey}> </input>
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

