import axios from "axios";

export async function getSummoner(summonerName, apiKey) {
  const resp = await axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`);
  return resp.data;
}

export async function getGame(encryptedSummonerId, apiKey) {
  const resp = await axios.get(
    `https://euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${encryptedSummonerId}?api_key=${apiKey}`
  );
  return resp.data.participants;
}

export async function getAllChampion() {
    const resp = await axios.get(
      `http://ddragon.leagueoflegends.com/cdn/11.6.1/data/fr_FR/champion.json`
    );
    const championData = resp.data.data;
  
    // Create an object with champion names indexed by champion ID
    const champions = {};
    for (const [key, value] of Object.entries(championData)) { 
      champions[value.key] = {
        name: value.name,
        img: `http://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/${key}.png`,
      }
     
    }
  
    return champions;
  }

  export async function getAllSummonerSpells() {
    const resp = await axios.get(`https://ddragon.leagueoflegends.com/cdn/12.6.1/data/fr_FR/summoner.json`);
    const spellData = resp.data.data;
  
    // Create an object with spell img indexed by key
    const spells = {};
    for (const [key, value] of Object.entries(spellData)) {
      spells[value.key] = {
        name: value.name,
        img: `http://ddragon.leagueoflegends.com/cdn/12.6.1/img/spell/${key}.png`,
      }
     
    }
    return spells;
  }
  
// export async function getChampionImg(championName) {
//     const resp = await axios.get(
//       `http://ddragon.leagueoflegends.com/cdn/11.6.1/img/champion/${championName}.png`
//     );
//     return resp;
//   }