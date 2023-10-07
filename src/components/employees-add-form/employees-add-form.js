import React, { Component } from 'react';
import './employees-add-form.css';

class EmployeesAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            salary: '' 
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }


    onSalaryCheck = (arg) =>  {
        if (arg == '') {
            arg = '0'
            return arg
        } else return arg
        
    }

    render() {
        const {onAdd, setText} = this.props;
        const {name, salary} = this.state;
        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form
                    className="add-form d-flex"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (name.length > 3 && !/[0-9]/.test(name)) {
                          
                            onAdd(name, this.onSalaryCheck(salary))
                            console.log(!/[0-9]/.test(name))
                            this.setState({
                                name: '',
                                salary: ''
                            })
                        }
                    }}
                    >
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="Как его зовут?"
                        onChange={(e) => {
                            this.onValueChange(e)
                            
                        }} name="name"
                        value={name}/>
                    <input type="number"
                        className="form-control new-post-label"
                        placeholder="З/П в $?"
                        onChange={this.onValueChange} name="salary"
                        value={salary}/>
    
                    <button type="submit"
                            className="btn btn-outline-light"
                           
                            >Добавить</button>
                </form>
            </div>
        )
    }

    
}

export default EmployeesAddForm;

