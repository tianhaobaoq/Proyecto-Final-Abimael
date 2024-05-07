
//Funciones para buscar invocador
async function BuscarInvocador() {
  console.log(document.getElementById("nombreinvocador").value)
  const nombreinvocador = document.getElementById("nombreinvocador").value;
  const API_KEY = "RGAPI-1c38c85d-3071-4ad2-bb0f-42b5ace5530b";

  try {
    const response = await fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nombreinvocador}?api_key=${API_KEY}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Hubo un error al buscar el invocador:", error);
    return null;
  }
}



async function handleBuscarInvocador(setInvocador, setError) {
  try {
    const data = await BuscarInvocador();
    console.log("Datos del invocador:", data);

    if (data) {
      const nombreInvocador = document.getElementById("nombreinvocador").value;
      setInvocador({ name: nombreInvocador, ...data });
      setError(false);
    } else {
      setInvocador(null);
      setError(true);
    }
    return data;
  } catch (error) {
    console.error("Hubo un error al buscar el invocador:", error);
    setInvocador(null);
    setError(true);
    return null;
  }
}



async function recibirDatosInvocador(setInvocador, setError){
  const data = await handleBuscarInvocador(setInvocador, setError);
  if (!data) {
    setError(true);
  }
}

export default recibirDatosInvocador;
  