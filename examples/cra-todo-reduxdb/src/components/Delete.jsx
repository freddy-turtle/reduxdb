const Delete = ({ onClick }) => (
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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-square-x"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#999"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M10 10l4 4m0 -4l-4 4" />
    </svg>
  </button>
);

export default Delete;