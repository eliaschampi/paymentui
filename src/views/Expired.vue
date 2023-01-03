<script setup>
import {ref} from "vue";

const disablebtn = ref(false);


</script>
<template>
  <BasePageHeading
    title="Registros expirados"
    subtitle="reporte de pagos vencidos"
  >
    <template #extra>
      <button
        v-click-ripple
        type="button"
        class="btn btn-alt-primary"
        :disabled="disablebtn"
      >
        <i class="fa fa-plus opacity-50 me-1"/>
        Nuevo registro
      </button>
    </template>
  </BasePageHeading>
  <div class="content">
    Expirados
  </div>
</template>
