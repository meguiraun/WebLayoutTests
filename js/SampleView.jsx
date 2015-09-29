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


