<script setup>
import { onMounted, ref } from "vue";
import { useTemplateStore } from "../stores/template";
import { useServiceStore } from "../stores/service";
import ServiceCard from "./components/ServiceCard.vue";
import rtypes from "../data/services";

const store = useTemplateStore();
const serviceStore = useServiceStore();
const disablebtn = ref(false);
onMounted(serviceStore.fetchAll);

function defineRname(name) {
  const full = rtypes[name];
  return full || "Servicio";
}

function showEdit(item) {
  serviceStore.$patch({ service: item });
  store.sideOverlay({ mode: 'toggle' });
}

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
        :disabled="disablebtn"
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
          :editable="disablebtn"
          :name="defineRname(item.name)"
          :description="item.description"
          :logo="item.logo"
          @edit="showEdit(item)"
          @del="serviceStore.destroy(item)"
        />
      </template>
    </div>
  </div>
</template>
