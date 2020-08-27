/**
 * Created by chalosalvador on 8/2/20
 */
import React, {useEffect, useState} from 'react';
import '../styles/todo-list.css';

const TodoList = () => {

    const [todos, setTodos] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [darkMode, setDarkMode] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [jsonId, setJsonID] = useState(1);
    const [taskInfo, setTaskInfo] = useState(null);


    useEffect(() => {
        console.log('efecto', todos.length);
        if (todos.length > 0) {
            document.title = `${todos.length} tareas pendientes`;
        } else {
            document.title = `No tienes tareas pendientes`;
        }
    }, [todos]);

    useEffect(() => {
        const getData = async () => {
            const data = await fetch("https://jsonplaceholder.typicode.com/users/" + jsonId);
            const dataJson = await data.json();
            setUserInfo(dataJson);
            const taskData = await fetch("https://jsonplaceholder.typicode.com/users/" + jsonId + "/todos");
            const taskDataJson = await taskData.json();
            setTaskInfo(taskDataJson);
        }
        getData();
    }, [jsonId]);


    const sumId = () => {
        setJsonID(prevState => [
            parseInt(prevState) + 1
        ])
    }

    const restId = () => {
        setJsonID(prevState => [
            parseInt(prevState) - 1
        ])
    }

    const handleDarkMode = () => {
        setDarkMode((prevState) => !prevState);
        handleCompleteTask();
    }

    const handleAddTask = () => {
        const task = document.querySelector('#task').value;
        setTodos(prevState => [...prevState, task]);
        document.querySelector('#task').value = '';
    };

    const handleDeleteTask = (index) => {
        setTaskInfo((prevState) => {
            return prevState.filter((task, i) => i !== index);
        });
    };

    const handleCompleteTask = (index) => {
        setCompleted((prevState) => [
            todos[index]
        ]);

        handleDeleteTask(index);
    };


    return (
        <div>

            <div>

                {
                    jsonId > 1 &&
                    <button onClick={restId}>Anterior usuario</button>
                }

                {
                    jsonId < 10 &&
                    <button onClick={sumId}>Siguiente usuario</button>
                }

                <h1>Info usuario</h1>
                {
                    userInfo ?
                        <ul>
                            <li>Nombre: {userInfo.name}</li>
                            <li>Usuario: {userInfo.username}</li>
                            <li>Email:{userInfo.email}</li>
                            <li>Web: {userInfo.name}</li>
                            <li>Teléfono: {userInfo.phone}</li>
                        </ul>
                        : <div className='loader'></div>

                }
            </div>

            <button onClick={handleDarkMode}>
                {
                    darkMode
                        ? 'Modo claro'
                        : 'Modo oscuro'
                }
            </button>


            <div>
                <label htmlFor='task'>Tarea</label>
                <input type='text' id='task'/>

                <button onClick={handleAddTask}>Agregar tarea</button>
            </div>
            {
                taskInfo ?
                    <div>
                        <h1>Lista de tareas ({ taskInfo.length } en total)</h1>
                        <table>
                            <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Estado</th>
                                <th>Eliminar</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                taskInfo.map((taskInfo, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{taskInfo.title}</td>
                                                <td>
                                                    <button onClick={handleDarkMode} className={darkMode ? 'dark-mode' : ''}>
                                                        {
                                                            taskInfo.completed
                                                                ? 'Tarea Completado'
                                                                : 'Completar taréa'
                                                        }
                                                    </button>
                                                </td>
                                                <td>
                                                    <button onClick={() => handleDeleteTask(index)}>Eliminar</button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                )

                            }
                            </tbody>
                        </table>


                    </div>

                    : <div className='loader'></div>
                // <table>
                //     <thead>
                //     <tr>
                //         <th>Nombre</th>
                //         <th>Estado</th>
                //         <th>Eliminar</th>
                //     </tr>
                //     </thead>
                //     <tbody>
                //     {
                //         todos.map( ( task, index ) => (
                //                 <tr key={ index }>
                //                     <td>{ task }</td>
                //                     <td>
                //                         <button onClick={ () => handleCompleteTask( index ) }>Completada</button>
                //                     </td>
                //                     <td>
                //                         <button onClick={ () => handleDeleteTask( index ) }>Eliminar</button>
                //                     </td>
                //                 </tr>
                //             )
                //         )
                //     }
                //     </tbody>
                // </table>

            }


            {/*<h1>Lista de tareas completadas ({ completed.length } en total)</h1>*/}
            {/*<table>*/}
            {/*  <thead>*/}
            {/*  <tr>*/}
            {/*    <th>Nombre</th>*/}
            {/*  </tr>*/}
            {/*  </thead>*/}
            {/*  <tbody>*/}
            {/*  {*/}
            {/*    completed.map( ( task, index ) => (*/}
            {/*        <tr key={ index }>*/}
            {/*          <td>{ task }</td>*/}
            {/*        </tr>*/}
            {/*      )*/}
            {/*    )*/}
            {/*  }*/}
            {/*  </tbody>*/}
            {/*</table>*/}
        </div>
    );
};

export default TodoList;
