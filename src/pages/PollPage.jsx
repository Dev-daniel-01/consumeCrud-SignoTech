import { Menu } from "../components/menu.jsx";

import PollDetail from "../components/pollDetail.jsx";

import style from "./PoolPage.module.css"

export default function PollPage() {
  return (
    <div className={style.container}>
         <Menu option01="Sistema de votação" option02="" option03=""></Menu>     
      <PollDetail />
     </div>
  );
}