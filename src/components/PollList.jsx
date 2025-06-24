import { useEffect, useState } from "react";
import { fetchPolls } from "../api/pollService";
import { Link } from "react-router-dom";

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
    <div>
      <h2>Enquetes</h2>
      <ul>
        {polls.map(poll => (
          <li key={poll.id}>
            <Link to={`/poll/${poll.id}`}>
              <strong>{poll.title}</strong>
            </Link>
            <br />
            De: {new Date(poll.start_date).toLocaleString()} <br />
            Até: {new Date(poll.end_date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}