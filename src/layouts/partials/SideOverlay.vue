<script setup>
import { onMounted, onUnmounted, computed } from "vue";
import { useTemplateStore } from "@/stores/template";
import { useServiceStore } from "@/stores/service";
import services from "../../data/services";
import { object, string } from "yup";
import SimpleBar from "simplebar";
import { Form, Field } from "vee-validate";

const store = useTemplateStore();
const ser = useServiceStore();

const schema = object().shape({
  name: string().required("El nombre es obligatorio"),
  description: string()
    .min(5, "La Descripción debe ser mayor a 5 caracteres")
    .required("Descripción es obligatorio"),
  logo: string().required("El logo es obligatorio")
});

const stypes = computed(() => {
  return Object.keys(services).map((item) => ({
    code: item,
    label: services[item]
  }));
});

function eventSideOverlay(event) {
  if (event.which === 27) {
    event.preventDefault();
    store.sideOverlay({ mode: "close" });
  }
}

onMounted(() => {
  new SimpleBar(document.getElementById("side-overlay"));
  document.addEventListener("keydown", eventSideOverlay);
});

// Remove keydown event listener
onUnmounted(() => {
  document.removeEventListener("keydown", eventSideOverlay);
});

async function sendData() {
  if (!ser.service.id) {
    await ser.create();
  } else {
    await ser.update();
  }
  store.sideOverlay({ mode: "close" });
}
</script>

<template>
  <!-- Side Overlay-->
  <aside id="side-overlay">
    <slot>
      <!-- Side Header -->
      <div class="content-header border-bottom">
        <slot name="header">
          <!-- User Avatar -->
          <a class="img-link me-1" href="javascript:void(0)">
            <img class="img-avatar img-avatar32" src="/assets/media/images/add.png" alt="Icon" />
          </a>
          <!-- END User Avatar -->

          <!-- User Info -->
          <div class="ms-2">
            <a class="text-dark fw-semibold fs-sm" href="javascript:void(0)">
              {{ !ser.service.id ? "Crear" : "Modificar" }} Servicio
            </a>
          </div>
          <!-- END User Info -->
        </slot>

        <!-- Close Side Overlay -->
        <button type="button" class="ms-auto btn btn-sm btn-alt-danger" @click="store.sideOverlay({ mode: 'close' })">
          <i class="fa fa-fw fa-times" />
        </button>
        <!-- END Close Side Overlay -->
      </div>
      <!-- END Side Header -->

      <slot name="content">
        <!-- Side Content -->
        <div class="content-side">
          <!-- Side Overlay Tabs -->
          <BaseBlock transparent :rounded="false" class="pull-x pull-t">
            <Form class="d-flex flex-column" :validation-schema="schema" v-slot="{ errors }" @submit="sendData">
              <div class="mb-4">
                <label class="form-label" for="types_i">
                  Nombre del servicio
                </label>
                <Field as="select" id="types_i" name="name" class="form-select" :class="{ 'is-invalid': errors.name }"
                  v-model="ser.service.name">
                  <option value="" selected disabled hidden>Selecciona</option>
                  <template v-for="item in stypes">
                    <option :value="item.code">{{ item.label }}</option>
                  </template>
                </Field>
                <div v-show="errors.name" class="invalid-feedback animated fadeIn">
                  {{ errors.name }}
                </div>
              </div>
              <div class="mb-4">
                <label class="form-label" for="des_i"> Descripción </label>
                <Field as="textarea" class="form-control" id="des_i" name="description" rows="4"
                  placeholder="Ingrese una descripción breve" v-model="ser.service.description"/>
                <div v-show="errors.description" class="invalid-feedback animated fadeIn">
                  {{ errors.description }}
                </div>
              </div>
              <div class="mb-4">
                <label class="form-label" for="logo_i">
                  Logo
                  <small class="text-warning" style="font-size: 0.6rem">
                    * Deberia ser file uploader
                  </small>
                </label>
                <Field as="select" class="form-select" id="logo_i" name="logo" v-model="ser.service.logo">
                  <option value="" selected disabled hidden>Selecciona</option>
                  <option value="far fa-folder">{{ ser.service.name }}</option>
                </Field>
                <div v-show="errors.logo" class="invalid-feedback animated fadeIn">
                  {{ errors.logo }}
                </div>
              </div>
              <button type="submit" class="btn btn-lg btn-alt-primary">
                <i class="fa fa-fw fa-crow me-1 opacity-50" />
                Guardar
              </button>
            </Form>
          </BaseBlock>
          <!-- END Side Overlay Tabs -->
        </div>
        <!-- END Side Content -->
      </slot>
    </slot>
  </aside>
  <!-- END Side Overlay -->
</template>
