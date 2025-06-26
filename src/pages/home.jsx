import { useEffect, useState } from "react";

import { fetchPolls } from "../api/pollService";
import { Menu } from "../components/menu";

import PollList from "../components/PollList";
import ModalCreate from "../components/PollCreate";

import style from "./home.module.css";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [polls, setPolls] = useState([]);

  const getPolls = async () => {
    try {
      const data = await fetchPolls();
      setPolls(data);
    } catch (err) {
      console.error("Erro ao buscar enquetes:", err);
    }
  };

  useEffect(() => {
    getPolls();
  }, []);

  return (
    <div className={style.container}>
      <Menu
        option01="Enquetes"
        option02="PollCreate"
        option03="Criar"
        onClickCriar={() => setShowModal(true)}
      />

      <PollList polls={polls} setPolls={setPolls} />

      {showModal && (
        <ModalCreate
          close={() => setShowModal(false)}
          onCreate={() => {
            getPolls();            // atualiza a lista
            setShowModal(false);  // fecha o modal
          }}
        />
      )}
    </div>
  );
}
