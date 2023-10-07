import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.css';

const EmployeesList = ({list, onDelete, onToggleProp}) => {


    const elements = list.map((i) => {
        const {id, ...itemProps} = i
        return (
            <EmployeesListItem 
            key={id} 
            {...itemProps}
            onDelete={() => onDelete(id)}
            // onToggleIncrease={() => onToggleIncrease(id)}
            // onToggleRise={() => onToggleRise(id)}
            onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}
            />   
        )
    }
        
    )

    // console.log(elements)
    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default EmployeesList;