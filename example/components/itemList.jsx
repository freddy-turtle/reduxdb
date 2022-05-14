import { useState } from "react";
import Delete from "./Delete";
import Edit from "./Edit";
import Add from "./Add";
import Input from "./Input"

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const ItemList = () => {
  const [items, setItems] = useState([
    [true,"Go to the Swimming Pool 🏊", "1"], 
    [false, "Watch a movie 🎬", "2"], 
    [false, "Check your agenda 📅", "3"]
  ]);
  const [inputOpen, setInputOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null); 
  const [counter, setCounter] = useState(4);

  function deleteItem(i) {
    setItems( items => {
      const newItems = [...items];
      newItems.splice(i, 1);
      return newItems;
    });
  }
  function addItem(item) {
    setItems(items => {
      const newItems = [...items];
      newItems.push([false, item, String(counter)]);
      setCounter(counter => counter + 1)
      return newItems;
    });
  }
  function editItem(i, item) {
    setItems(items => {
      const newItems = [...items];
      newItems[i][1] = item;
      return newItems;
    });
  }

  const handleCheck = (i) => () => {
    setItems(items => {
      const newItems = [...items];
      newItems[i][0] = !items[i][0];
      return newItems;
    })
  }

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const myitems = Array.from(items);
    const [reorderedItem] = myitems.splice(result.source.index, 1);
    myitems.splice(result.destination.index, 0, reorderedItem);

    setItems(myitems);
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
    <Droppable droppableId="characters">
      { (provided) => (
      <div 
        className="flex flex-col gap-y-2 w-full sm:w-2/3 md:w-1/2 max-w-sm rounded-lg p-2 shadow-md bg-gray-100 text-left characters"
        {...provided.droppableProps} 
        ref={provided.innerRef}
        >
        {items.map(([checked, desc, id], index) => (
          <Draggable key={id} draggableId={id} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef} 
              {...provided.draggableProps} 
              {...provided.dragHandleProps}
              style={provided.draggableProps.style}
              >

            {index == itemToEdit ?
              <Input addReminder={(reminder) => {setItemToEdit(null); editItem(index, reminder)}} defaultAction="Edit" initialValue={desc} />
            : 
              <div
                key={id}
                className="border bg-gray-200 rounded flex flex-row items-center p-1 justify-between select-none"
              >
                <label className="flex items-center justify-start space-x-3 overflow-auto">
                  <input
                    type="checkbox"
                    name="checked-demo"
                    onChange={handleCheck(index)}
                    checked={checked}
                    className="form-tick appearance-none flex-initial bg-white bg-check h-6 w-24px min-w-6 border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none"
                  />
                </label> 
                <span className="font-light truncate max-h-16">
                  {desc}
                </span>
                <span className="flex flex-row">
                  <Edit onClick={() => setItemToEdit(index)} />
                  <Delete onClick={() => deleteItem(index)} />
                </span>
              </div>}
            </div>
          )}
          </Draggable>
        ))}
      {provided.placeholder}
      {inputOpen ? 
        <Input addReminder={(reminder) => {setInputOpen(false); addItem(reminder)}} /> : 
        <Add onClick={() => setInputOpen(true)} />}
      </div>
      )}
    </Droppable>
    </DragDropContext>
  );
};

export { ItemList };
