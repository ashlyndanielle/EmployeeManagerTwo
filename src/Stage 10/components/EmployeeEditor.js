import React, { Component } from 'react';

class EmployeeEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: null,
      originalEmployee: null,
      notModified: true
    };
  };

  componentWillReceiveProps(nextProps){
    this.setState({
      employee: Object.assign({}, nextProps.selected),
      originalEmployee: nextProps.selected,
      notModified: true
    });
  };

  handleChange = (property, value) => {
    if ( this.state.notModified ) {
      this.setState({ notModified: false })
    };
    const employeeCopy = Object.assign({}, this.state.employee);
    employeeCopy[property] = value;
    this.setState({
      employee: employeeCopy
    });
  };

  save = () => {
    const oe = this.state.originalEmployee;
    const em = this.state.employee;
    oe.updateName(em.name);
    oe.updatePhone(em.phone);
    oe.updateTitle(em.title);
    this.props.refreshList();
  };

  cancel = () => {
    this.setState({
      employee: Object.assign({}, this.state.originalEmployee),
      notModified: true
    })
  }

  render() {
    const { employee, originalEmployee, notModified } = this.state;
    return (
      <div className="infoCard">
        {
          employee
          ?
          <div>
            <span id="employeeID"> ID: { employee.id }</span>
            <p id="employeeTitle">{ originalEmployee.name }</p>
            <br />
            <button id="saveBtn" className="confirmationButton" disabled={ notModified } onClick={ this.save }> Save </button>
            <button className="neutralButton" disabled={ notModified } onClick={ this.cancel }> Cancel </button>
            <br />
            <span className="placeholderText">Name</span>
            <input className="materialInput" value={ employee.name } onChange={ e => this.handleChange('name', e.target.value) } />
            <span className="placeholderText">Phone Number</span>
            <input className="materialInput" value={ employee.phone } onChange={ e => this.handleChange('phone', e.target.value) } />
            <span className="placeholderText">Title</span>
            <input className="materialInput" value={ employee.title } onChange={ e => this.handleChange('title', e.target.value) } />
          </div>
          :
          <p id="noEmployee">No Employee Selected</p>
        }
      </div>
    );
  }
}

export default EmployeeEditor;