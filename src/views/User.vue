<script setup>
import { onMounted, reactive } from "vue";
import { fetchUsers } from "../api";
import UserCard from "./components/UserCard.vue";

const state = reactive({
  users: []
});

async function fetchUsersData() {
  const { data } = await fetchUsers();
  state.users = data.data;
}

onMounted(fetchUsersData);
</script>

<template>
  <BasePageHeading
    title="Usuarios del sistema"
    subtitle="Aqui podrá gestionar los usuario"
  >
    <template #extra>
      <button v-click-ripple type="button" class="btn btn-alt-primary">
        <i class="fa fa-plus opacity-50 me-1" />
        Agregar un usuario
      </button>
    </template>
  </BasePageHeading>
  <div class="content">
    <div class="content-heading">Usuarios: {{ state.users.length }}</div>
    <div class="row">
      <template v-for="user in state.users">
        <UserCard
          :username="user.username"
          :email="user.email"
          :is_staff="user.is_staff"
        />
      </template>
    </div>
  </div>
</template>
