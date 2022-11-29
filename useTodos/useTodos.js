import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";

const initialState = [
    // {
    //     id: new Date().getTime(),
    //     description: 'Recolectar la piedra del alma',
    //     done: false,
    // },
]

const init = () => {
    return JSON.parse( localStorage.getItem('todos')) || [];
}

export const useTodos = () => {
    
    const [ todos, dispatch ] = useReducer(todoReducer, [], init );
    
    useEffect(() => {
        //JSON.stringify pq solo pde almacenar strings, no obj (sino da [obj obj] cdo quiero pasar obj a string)
        localStorage.setItem('todos', JSON.stringify(todos)); 
    }, [todos])
 
    const todosCount = todos.length;
    const pendingTodosCount = todos.filter( todo => !todo.done).length;

    const handleNewTodo = ( todo ) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }
        dispatch( action );
    }

    const handleDeleteTodo = ( id ) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        });
    }
    
    const handleToggleTodo = ( id ) => {
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id
        });
    }

   
    
    return {
        todos,
        todosCount,
        pendingTodosCount,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
    }
}
