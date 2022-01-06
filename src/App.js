import useTimer from "./hooks/useTimer";
import { useState } from "react";
import useFetch from "./hooks/useFetch";
import Counter from "./counter/Counter";
import useDebounce from "./hooks/useDebounce";

export default function App() {
  const { value, startTimer, pauseTimer, resetTimer } = useTimer({
    initVal: 20,
  });

  const [page, setPage] = useState(1);
  const [url, setUrl] = useState(null);

  const [query, setQuery] = useState(null);

  const debouncedSearchTerm = useDebounce(query, 1000);

  const { loading, isError, data, fetchRequest } = useFetch(
    url + `&page=${page}`
  );

  console.log(debouncedSearchTerm);
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Timer</h2>
      <h3>{value}</h3>
      <button onClick={startTimer}>START</button>
      <button onClick={pauseTimer}>PAUSE</button>
      <button onClick={resetTimer}>RESET</button>
      <br />
      <br />
      <h2>Custom Hook - useFetch</h2>
      <input type="text" onChange={(e) => setQuery(e.target.value)} />
      <button
        onClick={() => {
          if (debouncedSearchTerm) {
            setUrl(`https://api.github.com/search/users?q=${query}`);
          }
        }}
      >
        Searh
      </button>
      <div>{loading && "LOADING"}</div>
      <div>
        {!loading &&
          data?.items?.map((item) => <div key={item.id}>{item.login}</div>)}
      </div>
      <div>
        <button onClick={() => setPage((prev) => prev + 1)}>NEXT</button>
      </div>
      <br />
      <Counter />
    </div>
  );
}
