import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { actions } from '../redux/todos'
import { useState } from "react";
import Delete from "./Delete";
import Edit from "./Edit";
import Add from "./Add";
import Input from "./Input";



const ItemList = () => {
  const todos = useAppSelector(state => state.todos.db)
  const dispatch = useAppDispatch()

  const [inputOpen, setInputOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

  function deleteItem(id: string) {
    dispatch(actions.delete(id))
  }
  function addItem(text : string) {
    dispatch(actions.insert({text, completed:false}))
  }
  function editItem(id : string, text: string, completed : boolean) {
    dispatch(actions.update({id, text, completed}))
  }

  const handleCheck = (id : string, text, completed) => () => {
    dispatch(actions.update({id, text, completed}))
  };

  function handleOnDragEnd(result : any) {
    if (!result.destination) return;
    dispatch(actions.reorder({sourceIndex : result.source.index, destinationIndex: result.destination.index}))
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
                    {index === itemToEdit ? (
                      <Input
                        addReminder={(reminder : string) => {
                          setItemToEdit(null);
                          editItem(id, reminder, completed);
                        }}
                        defaultAction="Edit"
                        initialValue={text}
                      />
                    ) : (
                      <div
                        key={id}
                        className="border bg-gray-200 rounded flex flex-row items-center p-1 justify-between select-none"
                        > 
                        <div className="form-check">
                        <label className="flex items-center justify-start space-x-3 overflow-auto">
                          <input
                            type="checkbox"
                            name="checked-demo"
                            onChange={handleCheck(id, text, !completed)}
                            checked={completed}
                            className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-100 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                        </label>
                        </div>
  
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
