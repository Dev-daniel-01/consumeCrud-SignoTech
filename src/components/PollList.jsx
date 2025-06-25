import { useEffect, useState } from "react";
import { fetchPolls } from "../api/pollService";
import { Link } from "react-router-dom";
import ModalUpdate from "./modalUpdate";
import style from "./PollList.module.css";

export default function PollList() {
  const [polls, setPolls] = useState([]);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState(null); // guarda a enquete selecionada

  useEffect(() => {
    fetchPolls()
      .then(setPolls)
      .catch(err => setError(err.message));
  }, []);

  const handleUpdate = async () => {
    const updatedPolls = await fetchPolls();
    setPolls(updatedPolls);
    setModalOpen(false);       // fecha o modal
    setSelectedPoll(null);     // limpa a enquete selecionada
  };

  if (error) return <div>Erro: {error}</div>;
  if (polls.length === 0) return <div>Carregando enquetes...</div>;

  return (
    <div className={style.container}>
      {modalOpen && selectedPoll && (
        <ModalUpdate
          poll={selectedPoll}
          close={() => {
            setModalOpen(false);
            setSelectedPoll(null);
          }}
          onUpdate={handleUpdate}
        />
      )}

      <h2 className={style.title}>Variadas</h2>
      <ul className={style.wrapCards}>
        {polls.map(poll => (
          <li key={poll.id}>
            <div className={style.cards}>
              <h4>{poll.title}</h4>
              <p className={style.pCards}>
                Esta votação será válida de{" "}
                <strong>{new Date(poll.start_date).toLocaleString()}</strong> até{" "}
                <strong>{new Date(poll.end_date).toLocaleString()}</strong>
              </p>
              <div style={{ display: "flex", gap: "1rem", paddingTop: "1rem" }}>
                <Link to={`/poll/${poll.id}`}>
                  <button className={style.button}>Ver detalhes</button>
                </Link>
                <button
                  onClick={() => {
                    setSelectedPoll(poll);  // define qual será editada
                    setModalOpen(true);     // abre o modal
                  }}
                  className={style.button}
                >
                  Editar
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
