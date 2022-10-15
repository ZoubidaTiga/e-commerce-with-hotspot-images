<template>
    <form id="app" @submit="checkForm" action="https://vuejs.org/" method="post">

        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
        <ul>
            <li v-for="(item, i) in errors" :key="i">{{ item }}</li>
        </ul>
        </p>

        <p>
            <label for="name">Name</label>
            <input id="name" v-model="name" type="text" name="name">
        </p>

        <p>
            <label for="age">Age</label>
            <input id="age" v-model="age" type="number" name="age" min="0">
        </p>

        <p>
            <label for="movie">Favorite Movie</label>
            <select id="movie" v-model="movie" name="movie">
                <option>Star Wars</option>
                <option>Vanilla Sky</option>
                <option>Atomic Blonde</option>
            </select>
        </p>

        <p>
            <input type="submit" value="Submit">
        </p>

    </form>
</template>
<script>
export default {
    components: {
        
    },
    data() {
        return {
            errors: [],
            name: null,
            age: null,
            movie: null
        }
    },
    created() {
       // this.fetchContacts()
    },
    methods: {
        checkForm: function (e) {
            if (this.name && this.age) {
                return true;
            }

            this.errors = [];

            if (!this.name) {
                this.errors.push('Name required.');
            }
            if (!this.age) {
                this.errors.push('Age required.');
            }
            if (this.age.length<3) {
                this.errors.push('Age required 3.');
            }

            e.preventDefault();
        }
    }
}

</script>