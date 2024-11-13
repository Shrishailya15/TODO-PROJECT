import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';//for generating the unique id
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {

      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, [])

  const toggledFinished=(e)=>{
     setshowFinished(!showFinished)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id);
    setTodo(t[0].todo);

    let newTodos = todos.filter((item) => {
      return item.id !== id;
    })
    setTodos(newTodos)
    saveTols();
  }

  const handleDelete = (e, id) => {

    let newTodos = todos.filter((item) => {
      return item.id !== id;
    })
    setTodos(newTodos)
    saveTols();
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveTols();
  }

  const handleChechBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveTols();
  }

  const saveTols = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  return (
    <>
      <Navbar />
      <div className="mx-3 container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
        <h1 className='font-bold text-center text-3xl'>iTAsk- Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Add a todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />

          <button onClick={handleAdd} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md  disabled:bg-violet-400' disabled={todo.length<=3}>Save</button>
        </div>
       
        <input className='my-4' type="checkbox" onChange={toggledFinished} checked={showFinished} /> Show finished
        <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>
        <h2 className="text-2xl font-bold"> Your todos </h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'> No Todos to Display</div>}
          {
            todos.map(item => {

              return(showFinished||!item.isCompleted)&& <div key={item.id} className="todo flex  justify-between my-3">
                <div className='flex gap-5'>
                  <input onChange={handleChechBox} type='checkbox' checked={item.isCompleted} name={item.id} id='' className="checkbox" />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full ">

                  <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-2'><CiEdit /></button>

                  <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-2'><MdDelete /></button>

                </div>
              </div>
            })
          }
        </div>
      </div>
    </>
  )
}

export default App
