<script setup>
import { onMounted, reactive, ref } from "vue";
import { useTemplateStore } from "../stores/template";
import { fetchPayments, fetchUsers } from "../api";
import { useResponse } from "../composables/useResponse";
import { Form, Field } from "vee-validate";
import { useServiceStore } from "../stores/service";
import { object, date, number } from "yup";
const { sideOverlay } = useTemplateStore();
const disablebtn = ref(false);
const payments = ref([]);
const users = ref([]);

const { showNotify } = useResponse();
const { services, fetchAll: fetchServices } = useServiceStore();

async function fetchUsersApi() {
  try {
    const { data } = await fetchUsers();
    users.value = data.data;
  } catch (error) {
    showNotify(error);
  }
}

const pay = reactive({
  id: "",
  user_id: "",
  service_id: "",
  amount: 0,
  payment_date: "",
  expiration_date: "",
});

const schema = object().shape({
  user_id: number().required("Usuario es obligatorio"),
  service_id: number().required("Servicio es obligatorio"),
  amount: number().required("Monto es obligatorio"),
  payment_date: date().required("Fecha de pago es obligatorio"),
  expiration_date: date().required("Fecha de pago es obligatorio"),
});

async function fetchData() {
  try {
    const { data } = await fetchPayments();
    payments.value = data.data.results;
  } catch (error) {
    showNotify(error);
  }
}

async function save(payload) {
  console.log(payload);
}

onMounted(() => {
  fetchServices();
  fetchUsersApi();
  fetchData();
});
</script>
<template>
  <div
    class="modal fade"
    id="paymod_i"
    tabindex="-1"
    role="dialog"
    aria-labelledby="paymod_i"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-slideup" role="document">
      <div class="modal-content">
        <BaseBlock
          :title="!pay.id ? 'Agregar pago' : 'Modificar pago'"
          transparent
          class="mb-0"
        >
          <template #options>
            <button
              type="button"
              class="btn-block-option"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i class="fa fa-fw fa-times"></i>
            </button>
          </template>
          <template #content>
            <div class="block-content fs-sm">
              <Form
                v-slot="{ errors }"
                :validation-schema="schema"
                @submit="save"
              >
                <div class="mb-4">
                  <label class="form-label" for="service_i"> Servicio </label>
                  <Field
                    as="select"
                    class="form-select"
                    id="service_i"
                    name="service_id"
                    v-model="pay.service_id"
                  >
                    <option value="" selected disabled hidden>
                      Selecciona
                    </option>
                    <template v-for="item in services" :key="item.id">
                      <option :value="item.id">
                        {{ item.name }}
                      </option>
                    </template>
                  </Field>
                  <div
                    v-show="errors.service_id"
                    class="invalid-feedback animated fadeIn"
                  >
                    {{ errors.service_id }}
                  </div>
                </div>
                <div class="mb-4">
                  <label class="form-label" for="user_i"> Usuario </label>
                  <Field
                    as="select"
                    class="form-select"
                    id="user_i"
                    name="user_id"
                    v-model="pay.user_id"
                  >
                    <option value="" selected disabled hidden>
                      Selecciona
                    </option>
                    <template v-for="item in users" :key="item.id">
                      <option :value="item.id">
                        {{ item.username }}
                      </option>
                    </template>
                  </Field>
                  <div
                    v-show="errors.user_id"
                    class="invalid-feedback animated fadeIn"
                  >
                    {{ errors.user_id }}
                  </div>
                </div>
              </Form>
            </div>
            <div class="block-content block-content-full text-end bg-body">
              <button
                type="button"
                class="btn btn-sm btn-alt-secondary me-1"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                class="btn btn-sm btn-primary"
                data-bs-dismiss="modal"
              >
                Guardar
              </button>
            </div>
          </template>
        </BaseBlock>
      </div>
    </div>
  </div>
  <BasePageHeading title="Pagos" subtitle="Registro de pagos por usuario">
    <template #extra>
      <button
        v-click-ripple
        @click="sideOverlay({ mode: 'toggle' })"
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
    <div class="row">
      <div class="col-6 col-lg-3">
        <a
          class="block block-rounded block-link-shadow text-center"
          href="javascript:void(0)"
          data-bs-toggle="modal"
          data-bs-target="#paymod_i"
        >
          <div class="block-content block-content-full">
            <div class="fs-2 fw-semibold text-success">
              <i class="fa fa-plus"></i>
            </div>
          </div>
          <div class="block-content py-2 bg-body-light">
            <p class="fw-medium fs-sm text-success mb-0">Agregar pago</p>
          </div>
        </a>
      </div>
    </div>
    <BaseBlock title="Todos los pagos">
      <div class="mb-4">
        <div class="input-group">
          <input
            type="text"
            class="form-control form-control-alt"
            id="one-ecom-products-search"
            name="one-ecom-products-search"
            placeholder="Buscar todos los pagos.."
          />
          <span class="input-group-text bg-body border-0">
            <i class="fa fa-search"></i>
          </span>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-borderless table-striped table-vcenter">
          <thead>
            <tr>
              <th class="text-center" style="width: 100px">ID</th>
              <th class="d-none d-md-table-cell">Servicio</th>
              <th class="d-none d-sm-table-cell text-center">Usuario</th>
              <th>Monto</th>
              <th class="d-none d-sm-table-cell text-end">Fecha de pago</th>
              <th class="d-none d-sm-table-cell text-end">Fecha de Exp.</th>
              <th class="d-none d-sm-table-cell text-end">Estado.</th>
              <th class="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="item in payments" :key="item.id">
              <tr>
                <td class="text-center fs-sm">
                  <span class="fw-semibold text-info">
                    <strong>{{ item.id }}</strong>
                  </span>
                </td>
                <td class="d-none d-md-table-cell fs-sm">
                  <span class="text-primary">{{ item.service_id }}</span>
                </td>
                <td class="d-none d-sm-table-cell text-center fs-sm">
                  {{ item.user_id }}
                </td>
                <td class="text-end d-none d-sm-table-cell fs-sm">
                  <strong>{{ item.amount }}</strong>
                </td>
                <td class="text-end d-none d-sm-table-cell fs-sm">
                  <strong>{{ item.payment_date }}</strong>
                </td>
                <td class="text-end d-none d-sm-table-cell fs-sm">
                  <strong>{{ item.expiration_date }}</strong>
                </td>
                <td>
                  <span class="badge bg-warning">Pendiente</span>
                </td>
                <td class="text-center fs-sm">
                  <a
                    class="btn btn-sm btn-alt-secondary"
                    href="javascript:void(0)"
                    data-bs-toggle="tooltip"
                    title="View"
                  >
                    <i class="fa fa-fw fa-eye"></i>
                  </a>
                  <a
                    class="btn btn-sm btn-alt-danger"
                    href="javascript:void(0)"
                    data-bs-toggle="tooltip"
                    title="Delete"
                  >
                    <i class="fa fa-fw fa-times text-danger"></i>
                  </a>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </BaseBlock>
  </div>
</template>
