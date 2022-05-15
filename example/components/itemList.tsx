import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { todoAdded, todoDeleted, todoReordered, todoToggled, todoEdited } from "../redux/todos";
import { useState } from "react";
import Delete from "./Delete";
import Edit from "./Edit";
import Add from "./Add";
import Input from "./Input";



const ItemList = () => {
  const todos = useAppSelector(state => state.todos)
  const dispatch = useAppDispatch()

  const [inputOpen, setInputOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

  function deleteItem(id: string) {
    dispatch(todoDeleted(id))
  }
  function addItem(text : string) {
    dispatch(todoAdded(text))
  }
  function editItem(id : string, text: string) {
    dispatch(todoEdited({id, text}))
  }

  const handleCheck = (id : string) => () => {
    dispatch(todoToggled(id))
  };

  function handleOnDragEnd(result : any) {
    if (!result.destination) return;
    dispatch(todoReordered({sourceIndex : result.source.index, destinationIndex: result.destination.index}))
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <div
            className="flex flex-col gap-y-2 w-full sm:w-2/3 md:w-1/2 max-w-lg rounded-lg p-2 shadow-md bg-gray-100 text-left characters"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {todos.map(({id, text, completed}, index) => (
              <Draggable key={id} draggableId={id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={provided.draggableProps.style}
                  >
                    {index == itemToEdit ? (
                      <Input
                        addReminder={(reminder : string) => {
                          setItemToEdit(null);
                          editItem(id, reminder);
                        }}
                        defaultAction="Edit"
                        initialValue={text}
                      />
                    ) : (
                      <div
                        key={id}
                        className="border bg-gray-200 rounded flex flex-row items-center p-1 justify-between select-none"
                      >
                        <label className="flex items-center justify-start space-x-3 overflow-auto">
                          <input
                            type="checkbox"
                            name="checked-demo"
                            onChange={handleCheck(id)}
                            checked={completed}
                            className="form-tick appearance-none flex-initial bg-white bg-check h-6 w-24px min-w-6 border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none"
                          />
                        </label>
                        <span className="font-light truncate max-h-16">
                          {text}
                        </span>
                        <span className="flex flex-row">
                          <Edit onClick={() => setItemToEdit(index)} />
                          <Delete onClick={() => deleteItem(id)} />
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {inputOpen ? (
              <Input
                addReminder={(reminder) => {
                  setInputOpen(false);
                  addItem(reminder);
                }}
              />
            ) : (
              <Add onClick={() => setInputOpen(true)} />
            )}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export { ItemList };
