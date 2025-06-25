import { useEffect, useState } from "react";
import { fetchPolls } from "../api/pollService";
import { Link } from "react-router-dom";

import style from "./PollList.module.css"

export default function PollList() {
  const [polls, setPolls] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPolls()
      .then(setPolls)
      .catch(err => setError(err.message));
  }, []);

  if (error) return <div>Erro: {error}</div>;
  if (polls.length === 0) return <div>Carregando enquetes...</div>;

  return (
    <div className={style.container}>
      <h2 className={style.title}>Enquetes</h2>
      <ul className={style.wrapCards}>
        {polls.map(poll => (
          <li key={poll.id}>
            <div className={style.cards}>
              <h4>{poll.title}</h4>
              <p className={style.pCards}>Está votação será válida de <strong>{new Date(poll.start_date).toLocaleString()}</strong> á  <strong>{new Date(poll.end_date).toLocaleString()}</strong></p>
              <Link to={`/poll/${poll.id}`}>
                <button className={style.button}>Ver detalhes \ Votar</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}