<script setup>
import { reactive } from "vue";
import { Form, Field } from 'vee-validate';
import { useRouter } from "vue-router";
import { useTemplateStore } from "@/stores/template";
import { object, string } from 'yup';
import { useAuthStore } from "../../stores/auth"

// Main store and Router
const store = useTemplateStore();

const router = useRouter();

// Input state variables
const state = reactive({
    email: "",
    password: "",
    message: ""
});

const schema = object().shape({
    email: string()
        .required('Correo es obligatorio')
        .email('Correo no valido'),
    password: string()
        .min(5, 'La contraseña debe ser mayor a 5 caracteres')
        .required('Contraseña es requerida')
});

async function onSubmit({ email, password }) {
    state.message = "";
    const { login } = useAuthStore();
    const err = await login(email, password);
    if (err) {
        state.message = err.message;
        return;
    }
    router.push({ name: "home" });
}
</script>

<template>
    <!-- Page Content -->
    <BaseBackground image="/assets/media/images/bg.png">
        <div class="row g-0 bg-primary-dark-op">
            <!-- Meta Info Section -->
            <div class="hero-static col-lg-4 d-none d-lg-flex flex-column justify-content-center">
                <div class="p-4 p-xl-5 flex-grow-1 d-flex align-items-center">
                    <div class="w-100">
                        <RouterLink :to="{ name: 'home' }" class="link-fx fw-semibold fs-2 text-white">
                            {{ store.app.name }} <span class="fw-normal">{{ store.app.version }}</span>
                        </RouterLink>
                        <p class="text-white-75 me-xl-8 mt-2">
                            Sistema administrativo para la educación del futuro
                        </p>
                    </div>
                </div>
                <div class="p-4 p-xl-5 d-xl-flex justify-content-between align-items-center fs-sm">
                    <p class="fw-medium text-white-50 mb-0">
                        <strong>{{ store.app.name + " " + store.app.version }}</strong>
                        &copy; {{ store.app.copyright }}
                    </p>
                    <ul class="list list-inline mb-0 py-2">
                        <li class="list-inline-item">
                            <a class="text-muted fw-medium" href="javascript:void(0)">
                                Web
                            </a>
                        </li>
                        <li class="list-inline-item">
                            <a class="text-muted fw-medium" href="javascript:void(0)">
                                Aula
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- END Meta Info Section -->

            <!-- Main Section -->
            <div class="hero-static col-lg-8 d-flex flex-column align-items-center bg-body-extra-light">
                <div class="p-3 w-100 d-lg-none text-center">
                    <RouterLink :to="{ name: 'home' }" class="link-fx fw-semibold fs-3 text-dark">
                        {{ store.app.name }} <span class="fw-normal">{{ store.app.version }}</span>
                    </RouterLink>
                </div>
                <div class="p-4 w-100 flex-grow-1 d-flex align-items-center">
                    <div class="w-100">
                        <!-- Header -->
                        <div class="text-center mb-5">
                            <p class="mb-3">
                                <i class="fa fa-2x fa-circle-notch text-primary-light"></i>
                            </p>
                            <h1 class="fw-bold mb-2">Iniciar Sesion</h1>
                            <p class="fw-medium text-muted">
                                Ingrese sus credenciales para acceder
                            </p>
                        </div>
                        <!-- END Header -->

                        <!-- Sign login -->
                        <div class="row g-0 justify-content-center">
                            <div class="col-sm-8 col-xl-4">
                                <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
                                    <div class="mb-4">
                                        <label class="form-label" for="fi-uname">Correo</label>
                                        <Field name="email" type="email" v-model="state.email"
                                            class="form-control form-control-lg form-control-alt py-3"
                                            :class="{ 'is-invalid': errors.email }" id="fi-uname"
                                            placeholder="Por ejemplo admin@aeduca.com" />

                                        <div v-show="errors.email" class="invalid-feedback animated fadeIn">
                                            {{ errors.email }}
                                        </div>
                                    </div>
                                    <div class="mb-4">
                                        <label class="form-label" for="fi-uname">Contraseña</label>
                                        <Field name="password" type="password" v-model="state.password"
                                            class="form-control form-control-lg form-control-alt py-3"
                                            :class="{ 'is-invalid': errors.password }" id="fi-uname"
                                            placeholder="********" />
                                        <div v-show="errors.password" class="invalid-feedback animated fadeIn">
                                            {{ errors.password }}
                                        </div>
                                    </div>
                                    <div class="alert alert-danger alert-dismissible" role="alert"
                                        v-show="state.message">
                                        {{ state.message }}
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center mb-4">
                                        <div>
                                            <RouterLink :to="{ name: 'home' }"
                                                class="text-muted fs-sm fw-medium d-block d-lg-inline-block mb-1">
                                                Olvidé mi contraseña
                                            </RouterLink>
                                        </div>
                                        <div>
                                            <button type="submit" class="btn btn-lg btn-alt-primary">
                                                <i class="fa fa-fw fa-sign-in-alt me-1 opacity-50"></i>
                                                Iniciar sesión
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                        <!-- END login -->
                    </div>
                </div>
                <div
                    class="px-4 py-3 w-100 d-lg-none d-flex flex-column flex-sm-row justify-content-between fs-sm text-center text-sm-start">
                    <p class="fw-medium text-black-50 py-2 mb-0">
                        <strong>{{ store.app.name + " " + store.app.version }}</strong>
                        &copy; {{ store.app.copyright }}
                    </p>
                    <ul class="list list-inline py-2 mb-0">
                        <li class="list-inline-item">
                            <a class="text-muted fw-medium" href="javascript:void(0)">
                                Web
                            </a>
                        </li>
                        <li class="list-inline-item">
                            <a class="text-muted fw-medium" href="javascript:void(0)">
                                Aula
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- END Main Section -->
        </div>
    </BaseBackground>
    <!-- END Page Content -->
</template>
