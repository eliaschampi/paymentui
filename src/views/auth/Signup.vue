<script setup>
import { reactive } from "vue";
import { Form, Field } from "vee-validate";
import { useRouter } from "vue-router";
import { object, string } from "yup";
import Auth from "../components/Auth.vue";
import { signupUser } from "../../api";
import { useResponse } from "../../composables/useResponse";

const router = useRouter();

const response = useResponse();

// Input state variables
const state = reactive({
  email: "",
  password: "",
  username: "",
  res: {}
});

const schema = object().shape({
  email: string().required("Correo es obligatorio").email("Correo no valido"),
  password: string()
    .min(5, "La contraseña debe ser mayor a 5 caracteres")
    .required("Contraseña es requerida"),
  username: string()
    .min(4, "Usuario debe tener al menos 4 caracteres")
    .required("Nombre de usuario es obligatorio")
});

async function onSubmit(userdata) {
  state.res = {};
  try {
    const { data } = await signupUser(userdata);
    state.res = response.showAlert(data);
    setTimeout(() => {
      router.push({ name: "login" });
    }, 1000);
  } catch (error) {
    state.res = response.showAlert(error);
  }
}
</script>

<template>
  <!-- Page Content -->
  <Auth
    title="Registrarme"
    description="¡Gracias por unirte a este gran sistema!"
  >
    <div class="row g-0 justify-content-center">
      <div class="col-sm-8 col-xl-4">
        <Form
          v-slot="{ errors }"
          :validation-schema="schema"
          @submit="onSubmit"
        >
          <div class="mb-4">
            <label class="form-label" for="fi-uname"> Correo </label>
            <Field
              id="fi-uname"
              v-model="state.email"
              name="email"
              type="email"
              class="form-control form-control-lg form-control-alt py-3"
              :class="{ 'is-invalid': errors.email }"
              placeholder="Por ejemplo admin@aeduca.com"
            />

            <div v-show="errors.email" class="invalid-feedback animated fadeIn">
              {{ errors.email }}
            </div>
          </div>
          <div class="mb-4">
            <label class="form-label" for="fi-password">Contraseña</label>
            <Field
              id="fi-password"
              v-model="state.password"
              name="password"
              type="password"
              class="form-control form-control-lg form-control-alt py-3"
              :class="{ 'is-invalid': errors.password }"
              placeholder="********"
            />
            <div
              v-show="errors.password"
              class="invalid-feedback animated fadeIn"
            >
              {{ errors.password }}
            </div>
          </div>
          <div class="mb-4">
            <label class="form-label" for="fi-user">Nombre de usuario</label>
            <Field
              id="fi-user"
              v-model="state.username"
              name="username"
              type="text"
              class="form-control form-control-lg form-control-alt py-3"
              :class="{ 'is-invalid': errors.username }"
              placeholder="por ejemplo panda"
            />

            <div
              v-show="errors.username"
              class="invalid-feedback animated fadeIn"
            >
              {{ errors.username }}
            </div>
          </div>
          <div
            v-show="state.res.color"
            class="alert-dismissible"
            :class="state.res.color"
            role="alert"
          >
            {{ state.res.message }}
          </div>
          <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
              <RouterLink
                :to="{ name: 'login' }"
                class="btn btn-lg btn-alt-primary"
              >
                Volver
              </RouterLink>
            </div>
            <div>
              <button type="submit" class="btn btn-lg btn-alt-success">
                Registrarme
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </Auth>
  <!-- END Page Content -->
</template>
