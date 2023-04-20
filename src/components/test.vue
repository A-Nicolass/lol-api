<template>
  <div>
    <label for="summoner-name">Summoner name:</label>
    <input type="text" id="summoner-name" v-model="summonerName" />
    <button @click="fetchSummonerData">Get data</button>

    <div v-if="summoner">
      <h2>{{ summoner.name }} ({{ summoner.summonerLevel }})</h2>
      <h3>Match participants:</h3>
      <ul>
        <li v-for="(participant, index) in participants" :key="index">
          <div>
            <img
              :src="participant.championImg"
              :alt="participant.championName"
              width="50"
            />
            <img
              :src="participant.spell1Img"
              :alt="participant.spell1Name"
              width="20"
            />
            <img
              :src="participant.spell2Img"
              :alt="participant.spell2Name"
              width="20"
            />
            {{ participant.summonerName }} - {{ participant.championName }}
          </div>
          <!-- <div>
            <img :src="getSpellImageUrl(participant.summoner1Id)" :alt="participant.summoner1Name" width="20">
            <img :src="getSpellImageUrl(participant.summoner2Id)" :alt="participant.summoner2Name" width="20">
          </div> -->
        </li>
      </ul>
    </div>

    <div v-if="loading">Loading...</div>
  </div>
</template>

<script>
import {
  getSummoner,
  getGame,
  getAllChampion,
  getAllSummonerSpells,
} from "../services/helper.js";

export default {
  data() {
    return {
      summonerName: "",
      summoner: null,
      participants: [],
      loading: false,
      championData: {},
      spellData: {},
    };
  },
  async created() {
    const championData = await getAllChampion();
    this.championData = championData;
    const spellData = await getAllSummonerSpells();
    this.spellData = spellData;
  },

  methods: {
    async fetchSummonerData() {
      this.loading = true;

      try {
        const summoner = await getSummoner(this.summonerName);
        const game = await getGame(summoner.id);

        // Replace champion ID with champion name
        const participants = game.map((participant) => {
          return {
            ...participant,
            championName: this.championData[participant.championId].name,
            championImg: this.championData[participant.championId].img,
            spell1Name: this.spellData[participant.spell1Id].name,
            spell2Name: this.spellData[participant.spell2Id].name,
            spell1Img: this.spellData[participant.spell1Id].img,
            spell2Img: this.spellData[participant.spell2Id].img,
          };
        });

        this.summoner = summoner;
        this.participants = participants;
      } catch (error) {
        console.error(error);
        alert("Cette personne n'est pas en game !");
      }

      this.loading = false;
    },

    // getChampionImageUrl(championId) {
    //   return `http://ddragon.leagueoflegends.com/cdn/${this.dataDragonVersion}/img/champion/${championId}.png`;
    // },
    getSpellImageUrl(spellId) {
      return `http://ddragon.leagueoflegends.com/cdn/${this.dataDragonVersion}/img/spell/${spellId}.png`;
    },
  },
};
</script>
