import { useRef } from "react";

const Input = ({addReminder, initialValue="", defaultAction="Add"}) => {
  const myInput = useRef()
  function handleSubmit(event) {
    addReminder(myInput.current.value)
    event.preventDefault()
  }
  return (
  <form className="flex flex-row w-full justify-center gap-x-1" onSubmit={handleSubmit}>
      <input
        ref={myInput}
        type="text"
        id="rounded-email"
        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        placeholder="Your reminder"
        defaultValue={initialValue}
      />
      <button className="px-2 py-1 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" type="submit">
            {defaultAction}
      </button>
  </form>
);
}

export default Input;