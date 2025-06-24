const API_URL = "http://localhost:9090"; 


export async function fetchPolls() {
    const response = await fetch(`${API_URL}/polls`);
    if (!response.ok) throw new Error("Erro ao buscar enquetes");
    return response.json();
  }
  
  export async function fetchPoll(id) {
    const response = await fetch(`${API_URL}/polls/${id}`);
    if (!response.ok) throw new Error("Erro ao buscar enquete");
    return response.json();
  }
  
  export async function voteOption(pollId, optionId) {
    const response = await fetch(`${API_URL}/polls/${pollId}/vote/${optionId}`, {
      method: "POST",
    });
    if (!response.ok) throw new Error("Erro ao votar");
    return response.json();
  }




  