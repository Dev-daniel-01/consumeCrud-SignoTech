import { useState } from "react";

import style from "./PollCreate.module.css";

const ModalCreate = ({ close, onCreate }) => {
  const [poll, setPoll] = useState({
    title: "",
    start_date: "",
    end_date: "",
  });

  const [options, setOptions] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePollChange = (e) => {
    const { name, value } = e.target;
    setPoll(prev => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (options.some(opt => opt.trim() === "")) {
      setError("Preencha todas as opções.");
      return;
    }

    try {
      const response = await fetch("http://localhost:9090/polls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...poll, options }),
      });

      if (!response.ok) throw new Error("Erro ao criar enquete");

      onCreate?.(); // callback para atualizar o pai
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
        <form className={style.modalContent} onSubmit={handleCreate}>
          <h2>Criar Enquete</h2>

          <label>Título:</label>
          <input
            name="title"
            placeholder={"Digite o nome de sua enquete"}
            value={poll.title}
            onChange={handlePollChange}
            required
          />

          <label>Data de Início:</label>
          <input
            type="datetime-local"
            name="start_date"
            value={poll.start_date}
            onChange={handlePollChange}
            required
          />

          <label>Data de Término:</label>
          <input
            type="datetime-local"
            name="end_date"
            value={poll.end_date}
            onChange={handlePollChange}
            required
          />

          <h4>Opções:</h4>
          {options.map((opt, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Opção ${index + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required
            />
          ))}

          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}

          <button type="submit" className={style.button}>Criar</button>
        </form>
      </div>
    </div>
  );
};

export default ModalCreate;
