
const Edit = ({ onClick }) => (
  <button
    type="button"
    className="flex justify-center items-center focus:ring-gray-400 focus:ring-offset-gray-200 text-white transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  w-6 h-6 rounded-xl "
    onClick={() =>
      setTimeout(() => {
        onClick();
        document.activeElement.blur();
      }, 300)
    }
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#999" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
      <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
      <line x1="16" y1="5" x2="19" y2="8" />
    </svg>
  </button>
);

export default Edit;