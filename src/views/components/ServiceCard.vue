<script>
export default {
  props: {
    name: String,
    description: String,
    logo: String,
    editable: Boolean
  }
};
</script>
<template>
  <div class="col-sm-6 col-xxl-3">
    <BaseBlock class="d-flex flex-column h-100 mb-0">
      <template #content>
        <div
          class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center"
        >
          <dl class="mb-0">
            <dt class="fs-3 fw-bold">{{ name }}</dt>
            <dd class="fs-sm fw-medium fs-sm fw-medium text-muted mb-0">
              {{ description }}
            </dd>
          </dl>
          <div class="item item-rounded-lg bg-body-light">
            <i :class="logo" class="fs-3 text-primary"></i>
          </div>
        </div>
        <div
          class="bg-body-light rounded-bottom p-3 d-flex justify-content-around"
        >
          <button
            :disabled="editable"
            type="button"
            class="btn btn-sm btn-outline-primary"
          >
            Modificar
          </button>
          <button
            :disabled="editable"
            type="button"
            class="btn btn-sm btn-alt-danger"
          >
            Eliminar
          </button>
        </div>
      </template>
    </BaseBlock>
  </div>
</template>
