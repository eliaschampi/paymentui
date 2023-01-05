<script setup>
import { ref } from "vue";

const disablebtn = ref(false);


</script>
<template>
  <BasePageHeading title="Registros expirados" subtitle="reporte de pagos vencidos">
    <template #extra>
      <button v-click-ripple type="button" class="btn btn-alt-primary" :disabled="disablebtn">
        <i class="fa fa-plus opacity-50 me-1" />
        Nuevo registro
      </button>
    </template>
  </BasePageHeading>
  <div class="content">
    <BaseBlock title="Pagos expirados">
      <div class="block-content">
        <table class="table table-striped table-vcenter">
          <thead>
            <tr>
              <th class="text-center" style="width: 50px;">#</th>
              <th>Pago</th>
              <th class="d-none d-sm-table-cell" style="width: 15%;">Penalidad</th>
              <th class="text-center" style="width: 100px;">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th class="text-center" scope="row">1</th>
              <td class="fw-semibold fs-sm">
                <a href="be_pages_generic_profile.html">1</a>
              </td>
              <td class="d-none d-sm-table-cell">
                <span
                  class="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill bg-success-light text-success">20.00</span>
              </td>
              <td class="text-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-alt-secondary" data-bs-toggle="tooltip" title="Editar">
                    <i class="fa fa-fw fa-pencil-alt"></i>
                  </button>
                  <button type="button" class="btn btn-sm btn-alt-secondary" data-bs-toggle="tooltip" title="Eliminar">
                    <i class="fa fa-fw fa-times"></i>
                  </button>
                </div>
              </td>
            </tr>

          </tbody>
        </table>
      </div>

    </BaseBlock>
  </div>
</template>
