import React, { useEffect, useState } from 'react';
import './App.css';


const getLocalData = () => {
  const lists = localStorage.getItem("todoItems");
  if (lists) {
    return JSON.parse(lists);
  }
  else {
    return [];
  }
}

function App() {

  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [editItem, setEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  const addItem = () => {
    if (!inputData) {
      alert('Pleaze fill the data');
    }
    else if (inputData && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === editItem) {
            return { ...curElem, name: inputData };
          }
          return curElem;
        })
      )
      setInputData("");
      setEditItem(null);
      setToggleButton(false);
    }
    else {
      const newInputData = {
        id: new Date().getTime().toString(),
        name: inputData
      }
      setItems([...items, newInputData]);
      setInputData("");
    }
  }

  const updateItem = (index) => {
    const editedItems = items.find((curElee) => {
      return curElee.id === index;
    });
    setInputData(editedItems.name);
    setEditItem(index);
    setToggleButton(true);
  }

  const deleteItem = (index) => {
    const updatedItems = items.filter((curEle) => {
      return curEle.id !== index;
    });
    setItems(updatedItems);
  };


  // use effect
  useEffect(() => {
    localStorage.setItem("todoItems", JSON.stringify(items));
  }, [items]);

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      addItem();
    }
  }
  return (
    <>
      <div className="body-container">
        <div className="todo-wrapper">
          <div className="todo-container">
            <h2>Todo App</h2>
            <div className="form-group">
              <input type="text" className="todo-input" onKeyPress={handleKeyPress} value={inputData} onChange={(event) => setInputData(event.target.value)} placeholder="Add your Items" />
              {toggleButton ? (<button className="add-btn" onClick={addItem}>Save</button>) : (<button className="add-btn" onClick={addItem}>Add </button>)}
            </div>
            <div className="todo-items-wrapper" id="todo-items-wrapper">

              {
                  items.length > 0 ?(
                  items.map((currItem, index) => {
                    return (
                      <div className="todo-items" key={currItem.id}>
                        <div className="item-name">
                          <div className="sn">{index + 1}</div>
                          <div>{currItem.name}</div>
                        </div>
                        <div className="item-action">
                          <span className="btn btn-info" onClick={() => updateItem(currItem.id)}></span>
                          <span className="btn btn-danger" onClick={() => deleteItem(currItem.id)}></span>
                        </div>
                      </div>
                    )
                  })):(<h3 className="no-item">No Items</h3>)
                }
        
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
