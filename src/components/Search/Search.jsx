import React, { useState, useContext, useRef, useCallback } from "react";
import debounce from "lodash.debounce";
import { SearchContext } from "../../App";
import styles from "./Search.module.scss";

const Search = () => {
  const [value, setValue] = useState("");
  const { setSearchValue } = useContext(SearchContext);
  const inputRef = useRef();

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 250),
    []
  );

  const onClickClear = () => {
    setSearchValue("");
    setValue("");
    inputRef.current.focus();
  };

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <svg className={styles.icon} height='48' viewBox='0 0 48 48' width='48'>
        <path d='M31 28h-1.59l-.55-.55C30.82 25.18 32 22.23 32 19c0-7.18-5.82-13-13-13S6 11.82 6 19s5.82 13 13 13c3.23 0 6.18-1.18 8.45-3.13l.55.55V31l10 9.98L40.98 38 31 28zm-12 0c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z' />
        <path d='M0 0h48v48H0z' fill='none' />
      </svg>
      <input
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder='Поиск пиццы...'
      />
      {value && (
        <svg
          ref={inputRef}
          onClick={onClickClear}
          className={styles.clearIcon}
          data-name='Capa 1'
          id='Capa_1'
          viewBox='0 0 20 19.84'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M10.17,10l3.89-3.89a.37.37,0,1,0-.53-.53L9.64,9.43,5.75,5.54a.37.37,0,1,0-.53.53L9.11,10,5.22,13.85a.37.37,0,0,0,0,.53.34.34,0,0,0,.26.11.36.36,0,0,0,.27-.11l3.89-3.89,3.89,3.89a.34.34,0,0,0,.26.11.35.35,0,0,0,.27-.11.37.37,0,0,0,0-.53Z' />
        </svg>
      )}
    </div>
  );
};

export default Search;
