import React, { useEffect, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { BsCheckLg, BsPencilSquare } from 'react-icons/bs'; // Import BsPencilSquare
import './App.css';

const App = () => {
    const [isCompleteScreen, setIsCompleteScreen] = useState(false);
    const [alltodos, setTodos] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [completedTodos,setCompletedTodos] = useState([]);
    const [currentEdit,setCurrentEdit] = useState("");
    const [currentEditedItem,setCurrentEditedItem] = useState("");

    const handleAddTodo = () => {
        let newTodoItem = {
            title: newTitle,
            description: newDescription,
        };

        let updatedTodoArr = [...alltodos];
        updatedTodoArr.push(newTodoItem);
        setTodos(updatedTodoArr);
        localStorage.setItem('todolist',JSON.stringify(updatedTodoArr));

        setNewTitle('');
    setNewDescription('');
    };


    const handleDeleteTodo = (index)=>{
        const updatedTodos = alltodos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
        localStorage.setItem('todolist', JSON.stringify(updatedTodos));    
    }
  
    const handleComplete= (index)=>{
        let now = new Date();
        let dd = now.getDate();
        let mm = now.getMonth();
        let yyyy = now.getFullYear();
        let h = now.getHours();
        let m = now.getMinutes();
        let s = now.getSeconds();
        let completedOn = dd +'-'+mm+'-'+yyyy+' AT:'+h+':'+m+':'+s; 
        let filteredItem = {
            ...alltodos[index],
            completedOn: completedOn
        }
        const updatedTodos = alltodos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    localStorage.setItem('todolist', JSON.stringify(updatedTodos));

    setCompletedTodos(prev => [...prev, filteredItem]);
    localStorage.setItem('completedTodos', JSON.stringify([...completedTodos, filteredItem]));
}

    const handleDeleteCompletedTodo = (index)=>{
        const updatedCompletedTodos = completedTodos.filter((_, i) => i !== index);
    setCompletedTodos(updatedCompletedTodos);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedTodos));
}

    useEffect(() => {
        let savedTodo = JSON.parse(localStorage.getItem('todolist'));
        let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos')); 
    
        if (savedTodo) {
            setTodos(savedTodo);
        }
    
        if (savedCompletedTodo) {
            setCompletedTodos(savedCompletedTodo);
        }
    }, []);

    const handleEdit = (ind, item) => { // Pass item to handleEdit function
            setCurrentEdit(ind);
            setCurrentEditedItem(item);
    }


    const handleUpdateTitle = (value)=>{
            setCurrentEditedItem((prev)=>{
                return{...prev, title: value} // Update title property
            })
    }

    const handleUpdateDescription = (value)=>{
        setCurrentEditedItem((prev)=>{
            return{...prev, description: value} // Update description property
        })
    }

    const handleUpdateTodo = ()=>{
        let newTodo = [...alltodos];
        newTodo[currentEdit] = currentEditedItem; // Update currentEditedItem
        setTodos(newTodo);
        setCurrentEdit("");
    }


    return (
        <div className='App'>
            <h1 className='h'>My Todo List</h1>

            <div className="todo-wrapper">
                <div className="todo-input">
                    <div className="todoinput-item">
                        <label>Title</label>
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            placeholder="What is the task title?"
                        ></input>
                    </div>
                    <div className="todoinput-item">
                        <label>Description</label>
                        <input
                            type="text"
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            placeholder="What is the description?"
                        ></input>
                    </div>
                    <div className="todoinput-item">
                        <button type="button" onClick={handleAddTodo} className="primaryBtn">
                            Add
                        </button>
                    </div>
                </div>

                <div className="Btn-area">
                    <button
                        className={`secondaryBtn ${isCompleteScreen === false && 'active'}`}
                        onClick={() => setIsCompleteScreen(false)}
                    >
                        Todo
                    </button>
                    <button
                        className={`secondaryBtn ${isCompleteScreen === true && 'active'}`}
                        onClick={() => setIsCompleteScreen(true)}
                    >
                        Completed
                    </button>
                </div>

                <div className="todo-list">
                     {isCompleteScreen === false && alltodos.map((item, index) => {
                        if(currentEdit===index){
                               return(
                                <div className='edit-wrapper' key={index}>
                                <input placeholder='updated Title' onChange={(e)=>handleUpdateTitle(e.target.value)} value={currentEditedItem.title}></input>
                               <textarea placeholder='Updated description' rows={4}  onChange={(e)=>handleUpdateDescription(e.target.value)} value={currentEditedItem.description}></textarea>
                               <button type="button" onClick={handleUpdateTodo} className="primaryBtn">
                            Update
                        </button>
                        </div>
                               );
                        }
                        else{
                            return (
                                <div className="todo-list-item" key={index}>
                                    <div>
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                    </div>
                                    <div>
                                        <MdDeleteForever className="icon" onClick={() => handleDeleteTodo(index)} title='Delete?' />
                                        <BsCheckLg className="check-icon" onClick={() => handleComplete(index)} title='Complete?'/>
                                        <BsPencilSquare className="check-icon" onClick={() => handleEdit(index,item)} title='Edit?' /> 
                                    </div>
                                </div>
                            );
                        }

         
    })}

    {isCompleteScreen === true && completedTodos.map((item, index) => {
        return (
            <div className="todo-list-item" key={index}>
                <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p><small>Completed On: {item.completedOn}</small></p>
                </div>
                <div>
                    <MdDeleteForever className="icon" onClick={() => handleDeleteCompletedTodo(index)} />
                </div>
            </div>
        );
    })}


                </div>
            </div>
        </div>
    );
};

export default App;
