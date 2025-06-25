import PollList from "../components/PollList";

import style from "./home.module.css"
import { Menu } from "../components/menu";

export default function Home() {
  return (
    <div className={style.container}>
      <Menu option01="Enquetes" option02="" option03="Criar"></Menu>
      
      <PollList />
    </div>
  );
}