type SearchFormProps = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchForm({
  searchText,
  setSearchText,
}: SearchFormProps) {
  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchText);
  };

  return (
    <form action="#" className="search" onSubmit={handleFormSubmit}>
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        spellCheck="false"
        type="text"
        value={searchText}
        required
        placeholder="Find remote developer jobs..."
        onChange={handleSearchTextChange}
      />
    </form>
  );
}
