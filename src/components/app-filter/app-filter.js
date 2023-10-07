import "./app-filter.css";

const AppFilter = ({onToggleShow, currentFilter}) => {
    const getAttribute = (e) => onToggleShow(e.target.getAttribute('data-toggle'))

    const buttonsData = [
        {name: 'all', label: 'Все сотрудники'},
        {name: 'increase', label: 'На повышение'},
        {name: 'moreThan1000', label: 'З/П больше 1000$'},
        {name: 'moreThan5000', label: 'З/П больше 5000$'},
    ]
  



    const buttons = buttonsData.map(({name , label}, index) => {
        // const active = currentFilter === name;
        // const clazz = active ? 'btn-light' : 'btn-outline-light' 
        return (
            <button type="button"
                // className={`btn ${clazz}`}
                className={currentFilter === name ? 'btn btn-light' : 'btn btn-outline-light'}
                data-toggle={name}
                onClick={getAttribute}
                key={index}
                >
                {label}
            </button>
        )
    })




    return (
        <div className="btn-group">
           {buttons}
        </div>
    )


//     <div className="btn-group">
//     <button type="button"
//             className="btn btn-light"
//             data-toggle="all"
//             onClick={getAttribute}
//             >
//             Все сотрудники
//     </button>
//     <button type="button"
//             className="btn btn-outline-light"
//             data-toggle="increase"
//             onClick={getAttribute}
//            >
//             На повышение
//     </button>
//     <button type="button"
//             className="btn btn-outline-light"
//             data-toggle="rise"
//             onClick={getAttribute}
//             >
//             З/П больше 1000$
//     </button>
// </div>
}

export default AppFilter;