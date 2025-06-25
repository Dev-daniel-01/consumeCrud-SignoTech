import PollDetail from "../components/pollDetail.jsx";
import style from "./PoolPage.module.css"
import { useNavigate } from "react-router";

export default function PollPage() {

  const navigate = useNavigate();

    const back = () => {
        navigate("/")
    }
  return (
    <div className={style.container}>
         <div className={style.miniMenu}>
              <h1 className={style.titleMenu}>Detalhes da Enquete</h1>
              
          </div>        
      <PollDetail />
    </div>
  );
}