import PollList from "../components/PollList";

import style from "./home.module.css"

export default function Home() {
  return (
    <div className={style.container}>
      <div className={style.miniMenu}>
        <h1 className={style.titleMenu}>Sistema de Votação</h1>
      </div>
      
      <PollList />
    </div>
  );
}