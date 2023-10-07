
import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';
import ErrorMessage from '../error-message/error-message';

import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : [
        {name: "Ivan", gender: "man", salary: 1000, increase: true, rise: false, id: 1},
        {name: "Alex", gender: "man", salary: 2200, increase: false, rise: true, id: 2},
        {name: "Maria", gender: "woman", salary: 300, increase: true, rise: true, id: 3},
        {name: "John", gender: "man", salary: 3700, increase: false, rise: false, id: 4},
        {name: "Sarah", gender: "woman", salary: 5100, increase: false, rise: false, id: 5},
        {name: "Michael", gender: "man", salary: 6000, increase: false, rise: true, id: 6},
        {name: "Emily", gender: "woman", salary: 1800, increase: false, rise: true, id: 7},
        {name: "David", gender: "man", salary: 500, increase: true, rise: false, id: 8},
        {name: "Olivia", gender: "woman", salary: 5500, increase: false, rise: false, id: 9},
        {name: "James", gender: "man", salary: 1950, increase: true, rise: true, id: 10},
        {name: "Sophia", gender: "woman", salary: 5300, increase: false, rise: true, id: 11},
        {name: "William", gender: "man", salary: 800, increase: true, rise: false, id: 12},
        {name: "Emma", gender: "woman", salary: 770, increase: true, rise: false, id: 13},
        {name: "Daniel", gender: "man", salary: 600, increase: true, rise: true, id: 14},
        {name: "Ava", gender: "woman", salary: 1500, increase: false, rise: true, id: 15},

      ],
      
      term: '',
      filter: '',
    }
    this.maxId = this.state.data.length + 1 ;
  }

 
  deleteItem = id => {
    this.setState(function({data}) {
      // const index = data.findIndex(elem => elem.id === id);

      // const before = data.slice(0, index);
      // const after = data.slice(index + 1);

      // const newArr = [...before, ...after];
      function filterArr (elem,id) {
        return elem.id !== id
      }

      const newArr = data.filter((elem) => filterArr(elem, id))
      
      return {
        data: newArr
      }
    })
  }

  addItem = (name , salary, gender) => {
    const newEmpl = {
      name,
      salary,
      gender,
      cookie: false,
      rise: false,
      id: this.maxId++
    }

    this.setState(({data}) => {
      const newArr = [
        ...data,
        newEmpl]
      
      
      return {
        data: newArr
      }
      
    })

    console.log(this.state.data)
  }

  // onToggleIncrease = id => {
  //   // this.setState(({data}) => {
  //   //   const index = data.findIndex((elem) => elem.id === id)

  //   //   const old = data[index];
  //   //   const newItem = {
  //   //     ...old,
  //   //     increase: !old.increase,
  //   //   };
  //   //   const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]

  //   //   return {
  //   //     data: newArr,
  //   //   }
    
  //   // })

  //   this.setState(({data}) => ({
  //     data: data.map(item => {
  //       if (item.id === id) {
  //         return {
  //           ...item, increase: !item.increase
  //         }
  //       }

  //       return item
  //     })
  //   }))


  // }

  // onToggleRise = (id) => {
  //   this.setState(({data}) => ({
  //     data: data.map(item => {
  //       if (item.id === id) {
  //         return {
  //           ...item, rise: !item.rise
  //         }
  //       }

  //       return item
  //     })
  //   }))
  // }


  onToggleProp = (id, prop) => {
    this.setState(({data}) => ({
      data: data.map(item => {
        if (item.id === id) {
          return {
            ...item, [prop]: !item[prop]
          }
        }

        return item
      })
    }))
  }


  searchEmp = (items, term) => {
      if (term.length === 0) {
        return items;
      }

      return items.filter(item => {
        return item.name.indexOf(term) > -1;
      })
  }


  onUpdateSearch = (term) => {
    this.setState({
      term 
    })
  }

  onToggleShow = (value) => {
    this.setState({filter : value})
  }

  elemToShow = (filter, data) => {
    switch(filter) {
      case 'all':
        return data;
      case 'increase': 
        return data.filter(item => item.increase);
      case 'moreThan1000':
        return data.filter(item => item.salary > 1000);
      case 'moreThan5000': 
        return data.filter(item => item.salary > 5000);
      case 'man': 
        return  data.filter(item => item.gender === 'man');
      case 'woman': 
        return data.filter(item => item.gender === 'woman');
      default:
        return data;
  }
}



  onSalaryChange = (id, newSalary) => {
    this.setState(({data}) => {
      return {
        data: data.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              salary: +newSalary.slice(0,-1),
              
            }
          }
          return item
        })
      }
    })
  }

  render () {
    let {data, term, filter} = this.state;
    const amount = data.length
    const onRise = data.filter(elem => elem.increase).length;
    const visibleData = this.elemToShow(filter, this.searchEmp(data, term)); 
 


    const componentToShow = (arg) => {
      if (arg.length !== 0) {
        return (
          <EmployeesList  
            list={arg}
            onDelete={this.deleteItem}
            // onToggleIncrease={this.onToggleIncrease}
            // onToggleRise={this.onToggleRise}
            onToggleProp={this.onToggleProp}
            onSalaryChange={this.onSalaryChange}
            />
           
        )
      } else {
        return (
          <ErrorMessage/>
        )
      }
    }
    return (
      <div className="app">
          <AppInfo
          amount={amount}
          increaseCounter={onRise} />
          
          <div className="search-panel">
              <SearchPanel
              onUpdateSearch={this.onUpdateSearch}
              />
              <AppFilter
              onToggleShow={this.onToggleShow}
              currentFilter={filter}
              />
          </div>
          

          {componentToShow(visibleData)}
          {/* <EmployeesList  
          list={elemToShow(filter)}
          onDelete={this.deleteItem}
          // onToggleIncrease={this.onToggleIncrease}
          // onToggleRise={this.onToggleRise}
          onToggleProp={this.onToggleProp}
          /> */}
          <EmployeesAddForm
          onAdd={this.addItem}
          />
      </div>
    );
  }


  
}

export default App;
