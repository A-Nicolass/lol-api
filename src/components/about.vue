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
import { getSummoner, getGame, getAllChampion } from "../services/helper.js";

export default {
  data() {
    return {
      summonerName: "",
      summoner: null,
      participants: [],
      loading: false,
      championData: {}, // Add this property
    };
  },
  async created() {
    const championData = await getAllChampion();
    console.log(championData);
    this.championData = championData;
  },

  methods: {
    async fetchSummonerData() {
      this.loading = true;

      try {
        const summoner = await getSummoner(this.summonerName);
        const game = await getGame(summoner.id);
        console.log(summoner.id);

        // Replace champion ID with champion name
        const participants = game.map((participant) => {
          return {
            ...participant,
            championName: this.championData[participant.championId].name,
            championImg: this.championData[participant.championId].img,
          };
        });

        this.summoner = summoner;
        this.participants = participants;

        console.log(participants);
      } catch (error) {
        console.error(error);
        alert("Error fetching data!");
      }

      this.loading = false;
    },

    // getChampionImageUrl(championId) {
    //   return `http://ddragon.leagueoflegends.com/cdn/${this.dataDragonVersion}/img/champion/${championId}.png`;
    // },
    // getSpellImageUrl(spellId) {
    //   return `http://ddragon.leagueoflegends.com/cdn/${this.dataDragonVersion}/img/spell/${spellId}.png`;
    // }
  },
};
</script>
