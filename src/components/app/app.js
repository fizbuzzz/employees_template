
import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : [
        {name : "Ivan", gender: 'man' , salary : 300, increase:true,  rise: false, id:1} ,
        {name:"Zelya" ,  gender: 'man' , salary:3000, increase:false, rise: false, id:2},
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

  addItem = (name , salary) => {
    const newEmpl = {
      name,
      salary,
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


  render () {
    let {data, term, filter} = this.state;
    const amount = data.length
    const onRise = data.filter(elem => elem.increase).length;
    const visibleData = this.searchEmp(data, term);
    const onShowIncrease = visibleData.filter(item => item.increase);
    const onShowSalary_1000 =  visibleData.filter(item => item.salary > 1000);
    const onShowSalary_5000 = visibleData.filter(item => item.salary > 5000);

    const elemToShow = (filter) => {
      switch(filter) {
        case 'all':
          return visibleData;
        case 'increase': 
          return onShowIncrease
        case 'moreThan1000':
          return onShowSalary_1000
        case 'moreThan5000': 
          return onShowSalary_5000
        default:
          return visibleData;
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
          
          <EmployeesList  
          list={elemToShow(filter)}
          onDelete={this.deleteItem}
          // onToggleIncrease={this.onToggleIncrease}
          // onToggleRise={this.onToggleRise}
          onToggleProp={this.onToggleProp}
          />
          <EmployeesAddForm
          onAdd={this.addItem}
          />
      </div>
    );
  }


  
}

export default App;
