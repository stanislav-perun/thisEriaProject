<template>
  <BaseCard>
    <TaskForm @save-data="saveData" />
  </BaseCard>
</template>

<script>
// @ is an alias to /src
import TaskForm from "../components/task/TaskForm.vue";
import BaseCard from "../components/ui/BaseCard.vue";

export default {
  name: "Home",
  components: {
    TaskForm,
    BaseCard
  },
  methods: {
    saveData(data) {
      this.$store.dispatch("saveTask", data);
      this.$router.replace("tasklist");
      this.$store.dispatch("loadTasks");
    }
  }
};
</script>
