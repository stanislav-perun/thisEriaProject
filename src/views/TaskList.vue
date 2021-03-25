<template>
  <BaseCard>
    <p v-if="tasks.length === 0">Zatím zde není žádný úkol</p>
    <ul v-else>
      <li v-for="task in tasks" :key="task.id">
        <BaseCard>
          <h5>{{ task.name }}</h5>
          <p>{{ task.desc }}</p>
          <p>Začátek: {{ task.start }}</p>
          <button @click="deleteTask(task.id)">Delete</button>
        </BaseCard>
      </li>
    </ul>
  </BaseCard>
</template>

<script>
import { mapState } from "vuex";
import BaseCard from "../components/ui/BaseCard.vue";

import axios from "axios";

export default {
  name: "TaskList",
  components: {
    BaseCard
  },
  created() {
    this.$store.dispatch("loadTasks");
    /* setInterval(() => {
      this.$store.dispatch("loadTasks")
    },5000) */
  },
  computed: {
    ...mapState(["tasks"])
  },
  methods: {
    deleteTask(id) {
      console.log(id);
      axios
        .delete(`https://vuestartingproject.firebaseio.com/tasks/${id}.json`)
        .then(this.$store.dispatch("loadTasks"))
        .then(this.$router.go());
    }
  }
};
</script>

<style scoped>
  ul {
    list-style: none;
  }

  @media only screen and (max-width: 700px) {
  
}
</style>
