<script setup>
import { onMounted, reactive } from "vue";
import { useTemplateStore } from "../stores/template";
import { fetchPayments, fetchUsers, createPayment, updatePayment, deletePayment } from "../api";
import { storeToRefs } from "pinia";
import { useResponse } from "../composables/useResponse";
import { Form, Field } from "vee-validate";
import { useServiceStore } from "../stores/service";
import { object, date as vdate, number as vnumber, string as vstring } from "yup";


const { sideOverlay } = useTemplateStore();
const { showNotify, confirm } = useResponse();
const { fetchAll } = useServiceStore();
const { services } = storeToRefs(useServiceStore());

const state = reactive({
  users: [],
  payments: [],
  disablebtn: false,
  pay: {}
})


async function fetchUsersApi() {
  try {
    const { data } = await fetchUsers();
    state.users = data.data;
  } catch (error) {
    showNotify(error);
  }
}

async function fetchData() {
  try {
    const { data } = await fetchPayments();
    state.payments = data.data.results;
  } catch (error) {
    showNotify(error);
  }
}

function toggleModal() {
  const element = document.getElementById("paymod_i");
  let modal = bootstrap.Modal.getInstance(element);
  if (!modal) {
    modal = new bootstrap.Modal(element);
  }
  modal.toggle();
}

async function save(payload) {
  const upsert = (payload) => {
    if (payload.id) {
      return updatePayment(payload)
    }
    return createPayment(payload);
  }
  try {
    const { data } = await upsert(payload);
    fetchData();
    toggleModal();
    showNotify(data);
  } catch (error) {
    showNotify(error);
  }
}

function edit(payload) {
  state.pay = payload;
  toggleModal();
}

function del(payload) {
  confirm("¿Estas seguro de eliminar este pago?", async () => {
    try {
      const { data } = await deletePayment(payload.id);
      state.payments.splice(state.payments.indexOf(payload), 1);
      showNotify(data);
    } catch (error) {
      showNotify(error);
    }
  })
}

const schema = object().shape({
  user_id: vstring().required("Usuario es obligatorio"),
  service_id: vstring().required("Servicio es obligatorio"),
  amount: vnumber().required("Monto es obligatorio"),
  payment_date: vdate().required("Fecha de pago es obligatorio"),
  expiration_date: vdate().required("Fecha de expiracion es obligatorio")
});


function userById(user_id) {
  const user = state.users.find(item => item.id === user_id);
  if (user) {
    return user.username;
  }
  return "Usuario"
}

function serviceById(service_id) {
  const service = services.value.find(item => item.id === service_id);
  if (service) {
    return service.name;
  }
  return "Servicio"
}


onMounted(async () => {
  await fetchUsersApi();
  await fetchData();
});


fetchAll();

</script>
<template>
  <div class="modal fade" id="paymod_i" tabindex="-1" role="dialog" aria-labelledby="paymod_i" aria-hidden="true">
    <div class="modal-dialog modal-dialog-slideup" role="document">
      <div class="modal-content">
        <BaseBlock :title="!state.pay.id ? 'Agregar pago' : 'Modificar pago'" transparent class="mb-0">
          <template #options>
            <button type="button" class="btn-block-option" data-bs-dismiss="modal" aria-label="Close">
              <i class="fa fa-fw fa-times"></i>
            </button>
          </template>
          <template #content>
            <Form :validation-schema="schema" v-slot="{ errors }" @submit="save">
              <div class="block-content fs-sm">
                <div class="mb-4">
                  <label class="form-label" for="service_i"> Servicio </label>
                  <Field as="select" class="form-select" id="service_i" name="service_id" v-model="state.pay.service_id"
                    :class="{ 'is-invalid': errors.service_id }">
                    <option value="" selected disabled hidden>
                      Selecciona
                    </option>
                    <template v-for="item in services" :key="item.id">
                      <option :value="item.id">
                        {{ item.name }}
                      </option>
                    </template>
                  </Field>
                  <div v-show="errors.service_id" class="invalid-feedback animated fadeIn">
                    {{ errors.service_id }}
                  </div>
                </div>
                <div class="mb-4">
                  <label class="form-label" for="user_i"> Usuario </label>
                  <Field as="select" class="form-select" :class="{ 'is-invalid': errors.user_id }" id="user_i"
                    name="user_id" v-model="state.pay.user_id">
                    <option value="" selected disabled hidden>
                      Selecciona
                    </option>
                    <template v-for="item in state.users" :key="item.id">
                      <option :value="item.id">
                        {{ item.username }}
                      </option>
                    </template>
                  </Field>
                  <div v-show="errors.user_id" class="invalid-feedback animated fadeIn">
                    {{ errors.user_id }}
                  </div>
                </div>
                <div class="mb-4">
                  <label class="form-label" for="amount"> Monto </label>
                  <Field type="number" id="amount_i" class="form-control form-control-alt" name="amount"
                    v-model="state.pay.amount" :class="{ 'is-invalid': errors.amount }" />
                  <div v-show="errors.amount" class="invalid-feedback animated fadeIn">
                    {{ errors.amount }}
                  </div>
                </div>
                <div class="mb-4">
                  <label class="form-label" for="payment_date"> Fecha de pago </label>
                  <Field type="date" id="payment_date_i" class="form-control form-control-alt" name="payment_date"
                    v-model="state.pay.payment_date" :class="{ 'is-invalid': errors.payment_date }" />
                  <div v-show="errors.payment_date" class="invalid-feedback animated fadeIn">
                    {{ errors.payment_date }}
                  </div>
                </div>
                <div class="mb-4">
                  <label class="form-label" for="expiration_date"> Fecha de expiracion </label>
                  <Field type="date" id="expiration_date_i" class="form-control form-control-alt" name="expiration_date"
                    v-model="state.pay.expiration_date" :class="{ 'is-invalid': errors.expiration_date }" />
                  <div v-show="errors.expiration_date" class="invalid-feedback animated fadeIn">
                    {{ errors.expiration_date }}
                  </div>
                </div>
              </div>
              <div class="block-content block-content-full text-end bg-body">
                <button type="button" class="btn btn-sm btn-alt-secondary me-1" data-bs-dismiss="modal">
                  Cancelar
                </button>
                <button type="submit" class="btn btn-sm btn-primary">
                  Guardar
                </button>
              </div>
            </Form>
          </template>
        </BaseBlock>
      </div>
    </div>
  </div>
  <BasePageHeading title="Pagos" subtitle="Registro de pagos por usuario">
    <template #extra>
      <button v-click-ripple @click="sideOverlay({ mode: 'toggle' })" type="button" class="btn btn-alt-primary"
        :disabled="state.disablebtn">
        <i class="fa fa-plus opacity-50 me-1" />
        Nuevo Servicio
      </button>
    </template>
  </BasePageHeading>
  <div class="content">
    <div class="row">
      <div class="col-6 col-lg-3">
        <a class="block block-rounded block-link-shadow text-center" href="javascript:void(0)" @click="edit({})">
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
      <div class="col-6 col-lg-3">
        <a class="block block-rounded block-link-shadow text-center" href="javascript:void(0)">
          <div class="block-content block-content-full">
            <div class="fs-2 fw-semibold text-warning">{{ state.payments.length }}</div>
          </div>
          <div class="block-content py-2 bg-body-light">
            <p class="fw-medium fs-sm text-warning mb-0">
              Expirados
            </p>
          </div>
        </a>
      </div>
      <div class="col-6 col-lg-3">
        <a class="block block-rounded block-link-shadow text-center" href="javascript:void(0)">
          <div class="block-content block-content-full">
            <div class="fs-2 fw-semibold text-info">0</div>
          </div>
          <div class="block-content py-2 bg-body-light">
            <p class="fw-medium fs-sm text-info mb-0">
              Pendientes
            </p>
          </div>
        </a>
      </div>
      <div class="col-6 col-lg-3">
        <a class="block block-rounded block-link-shadow text-center" href="javascript:void(0)">
          <div class="block-content block-content-full">
            <div class="fs-2 fw-semibold text-dark">{{ state.payments.length }}</div>
          </div>
          <div class="block-content py-2 bg-body-light">
            <p class="fw-medium fs-sm text-muted mb-0">
              Todos los pagos
            </p>
          </div>
        </a>
      </div>
    </div>
    <BaseBlock title="Todos los pagos">
      <div class="mb-4">
        <div class="input-group">
          <input type="text" class="form-control form-control-alt" id="one-ecom-products-search"
            name="one-ecom-products-search" placeholder="Buscar por usuario o servicio" />
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
            <template v-for="item in state.payments" :key="item.id">
              <tr>
                <td class="text-center fs-sm">
                  <span class="fw-semibold text-info">
                    <strong>{{ item.id }}</strong>
                  </span>
                </td>
                <td class="d-none d-md-table-cell fs-sm">
                  <span class="text-primary"> {{ serviceById(item.service_id) }}</span>
                </td>
                <td class="d-none d-sm-table-cell text-center fs-sm">
                  {{ userById(item.user_id) }}
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
                  <a class="btn btn-sm btn-alt-secondary" href="javascript:void(0)" data-bs-toggle="tooltip"
                    title="Modificar" @click="edit(item)">
                    <i class="fa fa-fw fa-eye"></i>
                  </a>
                  <a class="btn btn-sm btn-alt-danger" href="javascript:void(0)" data-bs-toggle="tooltip"
                    title="Eliminar" @click="del(item)">
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
