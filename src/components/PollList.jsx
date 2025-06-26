import { useState } from "react";
import { useNavigate } from "react-router";

import ModalUpdate from "./modalUpdate";

import style from "./PollList.module.css";




export default function PollList({ polls, setPolls }) {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [loadingPoll, setLoadingPoll] = useState(false);

  // Função para buscar enquete específica com options e abrir modal
  const fetchPollById = async (id) => {
    setLoadingPoll(true);
    try {
      const res = await fetch(`http://localhost:9090/polls/${id}`);
      if (!res.ok) throw new Error("Erro ao carregar enquete");
      const data = await res.json();
      setSelectedPoll(data);
      setModalOpen(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingPoll(false);
    }
  };

  // Atualiza lista após edição
  const handleUpdate = async () => {
    try {
      const res = await fetch("http://localhost:9090/polls");
      if (!res.ok) throw new Error("Erro ao atualizar lista");
      const pollsAtualizadas = await res.json();
      setPolls(pollsAtualizadas);
      setModalOpen(false);
      setSelectedPoll(null);
    } catch (err) {
      console.error(err);
    }
  };

  if (error) return <div>Erro: {error}</div>;
  if (!polls || polls.length === 0) return <div>Nenhuma enquete encontrada.</div>;

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
        {polls.map((poll) => (
          <li key={poll.id}>
            <div className={style.cards}>
              <h4 className={style.titleCards}>{poll.title}</h4>
              <p className={style.pCards}>
                Esta votação será válida de{" "}
                <strong>{new Date(poll.start_date).toLocaleString()}</strong> até{" "}
                <strong>{new Date(poll.end_date).toLocaleString()}</strong>
              </p>
              <div style={{ display: "flex", gap: "1rem", paddingTop: "1rem" }}>
                <button className={style.button} onClick={() => navigate(`/poll/${poll.id}`)}>Ver detalhes</button>
                <button
                  onClick={() => fetchPollById(poll.id)}
                  className={style.button}
                  disabled={loadingPoll}
                >
                  {loadingPoll ? "Carregando..." : "Editar"}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
