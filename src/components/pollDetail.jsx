    import { useEffect, useState } from "react";
    import { Navigate, useParams, useNavigate } from "react-router-dom";
    import { fetchPoll, voteOption } from "../api/pollService";
    import Option from "./Option";
    import style from "./pollDetail.module.css"

    export default function PollDetail() {
        const { id } = useParams();
        const [poll, setPoll] = useState(null);
        const [selectedOption, setSelectedOption] = useState(null);
        const [error, setError] = useState(null);
        const [loadingVote, setLoadingVote] = useState(false);
        const [successMsg, setSuccessMsg] = useState(null);
        


        const navigate = useNavigate();
        useEffect(() => {
            fetchPoll(id)
                .then(setPoll)
                .catch(err => setError(err.message));
        }, [id]);

        if (error) return <div>Erro: {error}</div>;
        if (!poll) return <div>Carregando enquete...</div>;

        const now = new Date();
        const start = new Date(poll.start_date);
        const end = new Date(poll.end_date);
        const isActive = now >= start && now <= end;

        const handleVote = async () => {
            if (!selectedOption) {
                setError("Selecione uma opção para votar");
                return;
            }
            setLoadingVote(true);
            setError(null);
            try {
                await voteOption(id, selectedOption);
                setSuccessMsg("Voto computado com sucesso!");
                const updatedPoll = await fetchPoll(id);
                setPoll(updatedPoll);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoadingVote(false);
            }
        };

        
        const handleDelete = async () => {
            try {
                const response = await fetch(`http://localhost:9090/polls/${id}`, {
                    method: "DELETE",
                });
        
                if (!response.ok) throw new Error("Erro ao deletar enquete");
        
                alert("Enquete excluída com sucesso.");
                navigate("/");
            } catch (err) {
                setError(err.message);
                console.error(err);
            }
        };

        return (
            <div className={style.container}>
                <div className={style.card}>
                    <h2>{poll.title}</h2>
                    <div className={style.cardInside}>
                    <p className={style.pCards}>Está votação será válida de <strong>{new Date(poll.start_date).toLocaleString()}</strong> á <strong>{new Date(poll.end_date).toLocaleString()}</strong></p>
                <ul>
                    {poll.options.map((opt) => (
                        <Option
                            key={opt.id}
                            option={opt}
                            votes={opt.votes}
                            disabled={!isActive}
                            onVote={setSelectedOption}
                        />
                    ))}
                </ul>
                    </div>
                <div style={{display: "flex", gap: "1rem"}}>
                <button onClick={handleDelete} className={style.button}>
                    Exluir
                </button>
                <button onClick={handleVote} className={style.button} disabled={!isActive || loadingVote}>
                    Votar
                </button>
                </div>
            
                {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                {!isActive && <p style={{color: "red", paddingTop: "10px"}}>Enquete não está ativa no momento.</p>}
                </div>
                
            </div>
        );
    }