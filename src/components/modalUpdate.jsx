import { useState } from "react";

import style from "./ModalUpdate.module.css";

function formatDateToMySQL(dateString) {
  if (!dateString) return null;
  const dt = new Date(dateString);
  const year = dt.getFullYear();
  const month = String(dt.getMonth() + 1).padStart(2, "0");
  const day = String(dt.getDate()).padStart(2, "0");
  const hours = String(dt.getHours()).padStart(2, "0");
  const minutes = String(dt.getMinutes()).padStart(2, "0");
  const seconds = String(dt.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const ModalUpdate = ({ poll, close, onUpdate }) => {
  const [editData, setEditData] = useState({
    title: poll.title,
    start_date: poll.start_date,
    end_date: poll.end_date,
  });

  const [options, setOptions] = useState(poll.options || []);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setEditData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = { ...updatedOptions[index], text: value };
    setOptions(updatedOptions);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");

    if (options.some((opt) => opt.text.trim() === "")) {
      setError("Preencha todas as opções.");
      return;
    }

    try {
      const body = {
        title: editData.title,
        start_date: formatDateToMySQL(editData.start_date),
        end_date: formatDateToMySQL(editData.end_date),
        options: options.map((opt) => ({ id: opt.id, text: opt.text })),
      };

      const response = await fetch(`http://localhost:9090/polls/${poll.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erro ao atualizar enquete");
      }

      onUpdate?.();
      close();
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div className={style.modalFundo}>
      <div className={style.modalContainer}>
        <button className={style.Button} onClick={close}>
          X
        </button>
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

          <h4>Opções:</h4>
          {options.map((opt, index) => (
            <input
              key={opt.id}
              type="text"
              placeholder={`Opção ${index + 1}`}
              value={opt.text}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required
            />
          ))}

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
