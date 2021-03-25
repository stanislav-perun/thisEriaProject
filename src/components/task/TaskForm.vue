<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !name.isValid }">
      <label for="name">Název úkolu</label>
      <input
        type="text"
        id="name"
        v-model.trim="name.val"
        @blur="clearValidity('name')"
      />
      <p v-if="!name.isValid">Úkol musí mít název</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Popis úkolu</label>
      <textarea
        id="description"
        rows="5"
        v-model.trim="description.val"
        @blur="clearValidity('description')"
      ></textarea>
      <p v-if="!description.isValid">Úkol musí mít nějaký popisek</p>
    </div>
    <div class="form-control">
      <label for="start">Začátek úkolu</label>
      <input type="date" id="start" v-model="dateStart" />

      <label for="end">Konec úkolu</label>
      <input type="date" id="start" v-model="dateEnd" />
    </div>
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>Druh práce</h3>
      <div>
        <input
          type="checkbox"
          id="coding"
          value="coding"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="coding">Kódování</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="programming"
          value="programming"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="backend">Programování</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="meeting"
          value="meeting"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="meeting">Meetingy</label>
      </div>
      <p v-if="!areas.isValid">Jedna možnost musí být zvolena</p>
    </div>
    <p v-if="!formIsValid">
      Prosím vyplnit všechna pole a zadat začátek a konec úkolu
    </p>
    <button>Uložit</button>
  </form>
</template>

<script>
import { mapState } from "vuex";

export default {
  emits: ["save-data"],
  data() {
    return {
      name: {
        val: "",
        isValid: true
      },
      description: {
        val: "",
        isValid: true
      },
      areas: {
        val: [],
        isValid: true
      },
      dateStart: null,
      dateEnd: null,
      formIsValid: true
    };
  },
  computed: {
    ...mapState(["tasks"])
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.name.val === "") {
        this.name.isValid = false;
        this.formIsValid = false;
      }
      if (this.description.val === "") {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      if (this.areas.val.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
      if (this.dateStart === null) {
        this.formIsValid = false;
      }
      if (this.dateEnd === null) {
        this.formIsValid = false;
      }
    },
    submitForm() {
      let id = null;

      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      if (this.tasks.length === 0) {
        id = 0;
      } else {
        id = Math.max(...this.tasks.map(task => task.id)) + 1;
      }

      const formData = {
        id: id,
        name: this.name.val,
        desc: this.description.val,
        areas: this.areas.val,
        start: this.dateStart,
        end: this.dateEnd
      };

      this.$emit("save-data", formData);
    }
  }
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
