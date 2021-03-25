import Vue from "vue";
import Vuex from "vuex";

import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: []
  },
  mutations: {
    SAVETASK(state, payload) {
      state.tasks.push(payload);
      console.log(state.tasks);
    },
    SET_DATA(state, payload) {
      if (payload == null) {
        console.log("nic");
      } else {
        state.tasks = payload;
      }
    }
  },
  actions: {
    loadTasks(context) {
      axios
        .get(`https://vuestartingproject.firebaseio.com/tasks.json`)
        .then(response => {
          console.log(response.data);
          const task = response.data;
          context.commit("SET_DATA", task);
        });
    },

    /* async loadTasks(context) {
      const response = await fetch(
        `https://vuestartingproject.firebaseio.com/tasks.json`
      );
      const responseData = await response.json();
      console.log(responseData)

      if (!response.ok) {
        console.log("error");
      }

      const tasks = [];
      
      for (const key in responseData) {

        
        const task = {
          id: key,
          name: responseData[key].name,
          desc: responseData[key].desc,
          areas: responseData[key].areas,
          start: responseData[key].start,
          end: responseData[key].end
        }; 

        tasks.push(task);

        context.commit("SET_DATA", task);
      }
    },*/
    async saveTask(context, data) {
      const newTask = data;
      console.log(data);

      const taskId = data.id;
      console.log(taskId);

      const response = await fetch(
        `https://vuestartingproject.firebaseio.com/tasks/${taskId}.json`,
        {
          method: "PUT",
          body: JSON.stringify(newTask)
        }
      );

      // const responseData = await response.json();

      if (!response.ok) {
        console.log("there is an error");
      }

      context.commit("SAVETASK", newTask);
    }
  },

  modules: {}
});
