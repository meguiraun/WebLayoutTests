/** @jsx React.DOM */

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