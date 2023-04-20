import axios from "axios";

const cdn_version = "13.8.1";

export async function getSummoner(summonerName) {
  try {
    const response = await axios.get(
      `https://goro.alexandre-nicolas.com/lol-api/api/summoner/${summonerName}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch summoner data");
  }
}

export async function getGame(encryptedSummonerId) {
  console.log(encryptedSummonerId);
  try {
    const response = await axios.get(
      `https://goro.alexandre-nicolas.com/lol-api/api/game/${encryptedSummonerId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch game data");
  }
}

export async function getAllChampion() {
  const resp = await axios.get(
    `https://ddragon.leagueoflegends.com/cdn/${cdn_version}/data/fr_FR/champion.json`
  );
  const championData = resp.data.data;

  // Create an object with champion names indexed by champion ID
  const champions = {};
  for (const [key, value] of Object.entries(championData)) {
    champions[value.key] = {
      name: value.name,
      img: `https://ddragon.leagueoflegends.com/cdn/${cdn_version}/img/champion/${key}.png`,
    };
  }

  return champions;
}

export async function getAllSummonerSpells() {
  const resp = await axios.get(
    `https://ddragon.leagueoflegends.com/cdn/${cdn_version}/data/fr_FR/summoner.json`
  );
  const spellData = resp.data.data;

  // Create an object with spell img indexed by key
  const spells = {};
  for (const [key, value] of Object.entries(spellData)) {
    spells[value.key] = {
      name: value.name,
      img: `https://ddragon.leagueoflegends.com/cdn/${cdn_version}/img/spell/${key}.png`,
    };
  }
  return spells;
}
