import "./app-info.css";

const AppInfo = (props) => {
    const {amount,increaseCounter} = props;
    return (
        <div className="app-info">
            <h1>Учет сотрудников в компании N</h1>
            <h2>Общее число сотрудников: {amount}</h2>
            <h2>Премию получат: {increaseCounter}</h2>
        </div>
    )
}

export default AppInfo;