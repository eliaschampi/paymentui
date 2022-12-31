<script setup>
import { onMounted } from "vue";
import { useTemplateStore } from "../stores/template";
import { useServiceStore } from "../stores/service";
import ServiceCard from "./components/ServiceCard.vue";

const store = useTemplateStore();
const serviceStore = useServiceStore();

onMounted(() => {
  serviceStore.fetchAll();
});
</script>

<template>
  <BasePageHeading
    title="Sistema de pagos"
    subtitle="Bienvenido querido usuario!"
  >
    <template #extra>
      <button
        v-click-ripple
        @click="store.sideOverlay({ mode: 'toggle' })"
        type="button"
        class="btn btn-alt-primary"
      >
        <i class="fa fa-plus opacity-50 me-1" />
        Nuevo Servicio
      </button>
    </template>
  </BasePageHeading>

  <div class="content">
    <div class="row items-push">
      <div class="content-heading">
        Servicios:
        <div class="badge bg-success">
          {{ serviceStore.services.length }}
        </div>
      </div>
      <template v-for="item in serviceStore.services">
        <ServiceCard
          :name="item.name"
          :description="item.description"
          :logo="item.logo"
        />
      </template>
    </div>
  </div>
</template>
