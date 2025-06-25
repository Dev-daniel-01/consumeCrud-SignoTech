import { useState } from "react";
import style from "./ModalUpdate.module.css";

const ModalUpdate = ({ poll, close, onUpdate }) => {
  const [editData, setEditData] = useState({
    title: poll.title,
    start_date: poll.start_date,
    end_date: poll.end_date,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setEditData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`http://localhost:9090/polls/${poll.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      if (!response.ok) throw new Error("Erro ao atualizar enquete");

      onUpdate?.(); // dispara callback no componente pai
      close();      // fecha o modal
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div className={style.modalFundo}>
      <div className={style.modalContainer}>
        <button className={style.Button} onClick={close}>X</button>
        <form className={style.modalContent} onSubmit={handleUpdate}>
          <h2>Editar Enquete</h2>

          <label>Título:</label>
          <input
            name="title"
            value={editData.title}
            onChange={handleChange}
            required
          />

          <label>Data de Início:</label>
          <input
            type="datetime-local"
            name="start_date"
            value={editData.start_date.slice(0, 16)}
            onChange={handleChange}
            required
          />

          <label>Data de Término:</label>
          <input
            type="datetime-local"
            name="end_date"
            value={editData.end_date.slice(0, 16)}
            onChange={handleChange}
            required
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" className={style.button}>
            Atualizar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdate;
