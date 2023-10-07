import React, { Component } from 'react';
import './employees-add-form.css';
// import { pointer } from '@testing-library/user-event/dist/types/pointer';

class EmployeesAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            salary: '',
            gender: ''
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }


    onSalaryCheck = (arg) =>  {
        if (arg === '') {
            arg = '0'
            return arg
        } else return arg
        
    }

    changeGender = (e) => {
        this.setState({
            gender: e.target.getAttribute('data-name')
        });
        
    }
    
    
    render() {
        const {onAdd} = this.props;
        const {name, salary, gender} = this.state;
        const styles = {cursor:'pointer', margin: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '30px'}
        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form
                    className="add-form d-flex"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (name.length > 3 && !/[0-9]/.test(name) && gender !== '') {
                          
                            onAdd(name, this.onSalaryCheck(salary), gender)
                            
                            this.setState({
                                name: '',
                                salary: '',
                                gender: ''
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
                    <i style={styles} onClick={this.changeGender}   data-name="man" className="fa-solid fa-person"></i>
                    <i style={styles} onClick={this.changeGender}  data-name="woman" className="fa-solid fa-person-dress"></i>
                    {/* <button type="button" onClick={this.changeGender}   name="man">man</button> */}
                    {/* <button type="button" onClick={this.changeGender}  name="woman">woman</button> */}

                    <button type="submit"
                            className="btn btn-outline-light"
                            style={{marginLeft: "15px"}}
                            >Добавить</button>
                </form>
            </div>
        )
    }

    
}

export default EmployeesAddForm;

