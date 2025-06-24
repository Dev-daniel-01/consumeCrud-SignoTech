import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPoll, voteOption } from "../api/pollService";
import Option from "./Option";

export default function PollDetail() {
    const { id } = useParams();
    const [poll, setPoll] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [error, setError] = useState(null);
    const [loadingVote, setLoadingVote] = useState(false);
    const [successMsg, setSuccessMsg] = useState(null);

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

    return (
        <div>
            <h2>{poll.title}</h2>
            <p>
                De: {start.toLocaleString()} <br />
                Até: {end.toLocaleString()}
            </p>

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

            <button onClick={handleVote} disabled={!isActive || loadingVote}>
                Votar
            </button>

            {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!isActive && <p>Enquete não está ativa no momento.</p>}
        </div>
    );
}