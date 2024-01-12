import { useState } from 'react';
import './App.css';
import Swal from 'sweetalert2'

function App() {

  let [list, setlist] = useState([])
  let [InputItem, setInputItem] = useState("")
  let [EditTodo, setEditTodo] = useState(null)

  function inputItem(e) {
    setInputItem(e.target.value);
  }

  function addItem() {
    if (InputItem !== "") {

      if (EditTodo !== null) {
        var copyList = [...list];
        copyList[EditTodo] = InputItem;
        setlist(copyList);
        setEditTodo(null);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your ToDo has been Updated.",
          showConfirmButton: false,
          timer: 2000
        })
        setInputItem('')
      } else {
        setlist([...list, InputItem]);
        setInputItem('')
      }
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter the Value!",
      });

    }
  }

  function EditItem(index) {
    setEditTodo(index)
    setInputItem(list[index])

  }
  function deleitem(index) {
    var CopyItem = [...list];
    CopyItem.splice(index, 1);
    setlist(CopyItem);
    setEditTodo(null)
  }
  function deleteAllItem() {
    setlist([])
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Your ToDos has been deleted",
      showConfirmButton: false,
      timer: 2000
    });
  }


  return (
    <div className="main container">

      <h1 id='h1'>TO-DO APP</h1>
      <div className='tryDiv'>
        <input onChange={inputItem} placeholder='Add Item' value={InputItem} type="text" id="inp" />
        <div className='btnDiv'>
          <button onClick={addItem} id='addbtn'>{EditTodo !== null ? "Edit Todo" : "Add Todo"}</button>

          <button id='DelAllbtn' onClick={deleteAllItem} style={{ display: list.length > 0 ? "block" : "none" }}>Delete All</button>

        </div>

      </div>

      <ul className='ul'>
        {
          list.map((value, index) => {
            return <div key={index}><li className='Li' key={index}>{value} <button className='libtn editbtn' onClick={() => EditItem(index)}>Edit</button> <button onClick={() => deleitem(index)} className='libtn delbtn'>Delete</button></li></div>
          })
        }
      </ul>

    </div>
  );
}

export default App;