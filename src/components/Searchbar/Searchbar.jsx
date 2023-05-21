import { useState } from "react";

export const Searchbar = ({saved}) => {
  const [findtext, setFindtext] = useState('');

  const hendlerChange = ({ target: { value } }) => {
    setFindtext(value);
  };
  const hendlerSubmit = e => {
    e.preventDefault();
    if (findtext.trim() === '') {
      return;
    }
    saved(findtext.trim().replace(' ', '+'));
    setFindtext('')
  };
  return (
    <header className="searchbar">
      <form className="searchForm" onSubmit={hendlerSubmit}>
        <button type="submit" className="searchForm-button">
          <span className="searchForm-button-label">Search</span>
        </button>

        <input
          className="searchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={hendlerChange}
          value={findtext}
        />
      </form>
    </header>
  );
}