
//Función para obtener el id del campeón
export async function obtenerRotacionCampeones() {
  
  const API_KEY = "RGAPI-1c38c85d-3071-4ad2-bb0f-42b5ace5530b";

  try {
    const response = await fetch(`https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${API_KEY}`);

    const data = await response.json();
    console.log("Respuesta:", data);

    const idsDeCampeonesRotacion = data.freeChampionIds;
    console.log("IDs de campeones:", idsDeCampeonesRotacion);

    return idsDeCampeonesRotacion;
  } catch (error) {
    console.error("Hubo un error al obtener la rotación de campeones:", error);
    return null;
  }
}

// Función que obtiene el nombre de un campeón por ID
export async function obtenerNombreDeCampeonDesdeAPI(id) {
  try {
    const response = await fetch('https://ddragon.leagueoflegends.com/cdn/14.4.1/data/en_US/champion.json');
  
    if (!response.ok) {
      throw new Error('No se pudo obtener la lista de campeones');
    }
  
    const data = await response.json();
  
    const campeonData = data.data;
    const campeon = Object.values(campeonData).find(campeon => campeon.key === id.toString());
  
    if (campeon) {
      return campeon.name;
    } else {
      throw new Error('Nombre de campeón no encontrado');
    }
  } catch (error) {
    console.error(`Error al obtener el nombre del campeón ${id}:`, error);
    return "Nombre no disponible";
  }
}

// Función que obtiene la imagen de un campeón por nombre
export async function obtenerURLImagenCampeonDesdeAPI(nombreCampeon) {
  try {
    const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${nombreCampeon}.png`);

    if (!response.ok) {
      throw new Error('No se pudo obtener la imagen del campeón');
    }

    return response.url;

  } catch (error) {
      console.error(`Error al obtener la imagen del campeón ${nombreCampeon}:`, error);
    return "Imagen no disponible";
  }
}

// Función que obtiene la descripción de un campeón por nombre
export async function obtenerDescripcionCampeonDesdeAPI(nombreCampeon) {
  try {
      const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/14.4.1/data/es_ES/champion/${nombreCampeon}.json`);

      if (!response.ok) {
          throw new Error('No se pudo obtener la información del campeón');
      }

      const data = await response.json();
      const blurb = data.data[nombreCampeon].blurb;
      return blurb;

  } catch (error) {
      console.error(`Error al obtener la descripción del campeón ${nombreCampeon}:`, error);
      return "Descripción no disponible";
  }
}

// Función que obtiene el título de un campeón por nombre
export async function obtenerTituloCampeonDesdeAPI(nombreCampeon) {
  try {
    const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/14.4.1/data/es_ES/champion/${nombreCampeon}.json`);

    if (!response.ok) {
      throw new Error('No se pudo obtener el título del campeón');
    }

    const data = await response.json();
    const campeonData = data.data[nombreCampeon];
    return campeonData.title;
  } catch (error) {
    console.error(`Error al obtener el título del campeón ${nombreCampeon}:`, error);
    return "Título no disponible";
  }
}

// Función que obtiene las habilidades de un campeón por nombre
export async function obtenerHabilidadesCampeonDesdeAPI(nombreCampeon) {
  try {
    const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/14.4.1/data/es_ES/champion/${nombreCampeon}.json`);

    const data = await response.json();
    const campeonData = data.data[nombreCampeon];
    const habilidades = campeonData.spells.map(spell => ({
      name: spell.name,
      image: spell.image
    }));
    return habilidades;
  } catch (error) {
    console.error("Error al obtener las habilidades del campeón:", error);
    return [];
  }
}