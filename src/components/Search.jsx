import searchIcon from "../assets/search.svg";
const Search = () => {
  return (
    <div className="bg-dark-100 mt-2 flex w-3/4 justify-center gap-4 rounded-lg px-3 py-2 sm:mt-4 sm:w-1/2 sm:px-4 sm:py-4">
      <img src={searchIcon} alt="search icon" className="" />
      <input
        type="text"
        placeholder="Search through 300+ movies online"
        className="text-light-200 flex-1 bg-transparent outline-hidden"
      />
    </div>
  );
};

export default Search;
