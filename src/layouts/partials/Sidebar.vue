<script setup>
import { ref, watch, onMounted } from "vue";
import { useTemplateStore } from "@/stores/template";

import BaseNavigation from "@/components/BaseNavigation.vue";

import SimpleBar from "simplebar";

// Grab menu navigation arrays
import menu from "@/data/menu";

const navigation = menu.main;

// Component properties
defineProps({
  withMiniNav: {
    type: Boolean,
    default: false,
    description: "If the sidebar is in Mini Nav Mode"
  }
});

// Main store
const store = useTemplateStore();

// Dark Mode preference helper for radios
const radioDarkMode = ref();

// Sets default dark mode preferences for radios
function setDarkModeRadioDefault() {
  if (store.settings.darkModeSystem) {
    radioDarkMode.value = "system";
  } else {
    if (store.settings.darkMode) {
      radioDarkMode.value = "dark";
    } else {
      radioDarkMode.value = "light";
    }
  }
}

// When the user sets dark mode preference through the radios
function onDarkModeRadioChange() {
  if (radioDarkMode.value === "system") {
    store.darkModeSystem({ mode: "on" });
  } else {
    store.darkModeSystem({ mode: "off" });

    if (radioDarkMode.value === "dark") {
      store.darkMode({ mode: "on" });
    } else {
      store.darkMode({ mode: "off" });
    }
  }
}

// Set dark mode preference radios default and watch for changes to store
setDarkModeRadioDefault();
watch(
  () => store.settings.darkModeSystem,
  () => {
    setDarkModeRadioDefault();
  }
);
watch(
  () => store.settings.darkMode,
  () => {
    setDarkModeRadioDefault();
  }
);

// Init SimpleBar (custom scrolling)
onMounted(() => {
  new SimpleBar(document.getElementById("simplebar-sidebar"));
});
</script>

<template>
  <!-- Sidebar -->
  <!--
    Sidebar Mini Mode - Display Helper classes

    Adding 'smini-hide' class to an element will make it invisible (opacity: 0) when the sidebar is in mini mode
    Adding 'smini-show' class to an element will make it visible (opacity: 1) when the sidebar is in mini mode
    If you would like to disable the transition animation, make sure to also add the 'no-transition' class to your element

    Adding 'smini-hidden' to an element will hide it when the sidebar is in mini mode
    Adding 'smini-visible' to an element will show it (display: inline-block) only when the sidebar is in mini mode
    Adding 'smini-visible-block' to an element will show it (display: block) only when the sidebar is in mini mode
  -->
  <nav
    id="sidebar"
    :class="{ 'with-mini-nav': withMiniNav }"
    aria-label="Main Navigation"
  >
    <slot>
      <!-- Side Header -->
      <div class="content-header">
        <slot name="header">
          <!-- Logo -->
          <RouterLink :to="{ name: 'home' }" class="fw-semibold text-dual">
            <span class="smini-visible">
              <i class="fa fa-circle-notch text-primary" />
            </span>
            <span class="smini-hide fs-5 tracking-wider">
              {{ store.app.name }}
              <span class="fw-normal">{{ store.app.version }}</span>
            </span>
          </RouterLink>
          <!-- END Logo -->
        </slot>

        <!-- Extra -->
        <div>
          <slot name="header-extra">
            <!-- Dark Mode -->
            <div class="dropdown d-inline-block ms-1">
              <button
                id="sidebar-dark-mode-dropdown"
                type="button"
                class="btn btn-sm btn-alt-secondary"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i v-if="!store.settings.darkMode" class="far fa-moon" />
                <i v-if="store.settings.darkMode" class="fa fa-moon" />
              </button>
              <div
                class="dropdown-menu dropdown-menu-end dropdown-menu fs-sm smini-hide border-0"
                style="min-width: 8rem"
                aria-labelledby="sidebar-dark-mode-dropdown"
              >
                <div class="px-3 py-2 space-y-2">
                  <div class="form-check">
                    <input
                      id="radio-dark-mode-off"
                      v-model="radioDarkMode"
                      class="form-check-input"
                      type="radio"
                      value="light"
                      @change="onDarkModeRadioChange"
                    />
                    <label
                      class="form-check-label fw-medium"
                      for="radio-dark-mode-off"
                      >Dia</label
                    >
                  </div>
                  <div class="form-check">
                    <input
                      id="radio-dark-mode-on"
                      v-model="radioDarkMode"
                      class="form-check-input"
                      type="radio"
                      value="dark"
                      @change="onDarkModeRadioChange"
                    />
                    <label
                      class="form-check-label fw-medium"
                      for="radio-dark-mode-on"
                      >Noche
                    </label>
                  </div>
                  <div class="form-check mb-0">
                    <input
                      id="radio-dark-mode-system"
                      v-model="radioDarkMode"
                      class="form-check-input"
                      type="radio"
                      value="system"
                      @change="onDarkModeRadioChange"
                    />
                    <label
                      class="form-check-label fw-medium"
                      for="radio-dark-mode-system"
                    >
                      Segun el SO
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <!-- END Dark Mode -->

            <!-- Options -->
            <div class="dropdown d-inline-block ms-1">
              <button
                id="sidebar-themes-dropdown"
                type="button"
                class="btn btn-sm btn-alt-secondary"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fa fa-brush" />
              </button>
              <div
                class="dropdown-menu dropdown-menu-end fs-sm smini-hide border-0"
                aria-labelledby="sidebar-themes-dropdown"
              >
                <!-- Color Themes -->
                <button
                  type="button"
                  class="dropdown-item d-flex align-items-center justify-content-between fw-medium"
                  @click="store.setColorTheme({ theme: '' })"
                >
                  <span>Predeterminado</span>
                  <i class="fa fa-circle text-default" />
                </button>
                <button
                  type="button"
                  class="dropdown-item d-flex align-items-center justify-content-between fw-medium"
                  @click="store.setColorTheme({ theme: 'amethyst' })"
                >
                  <span>Nerd</span>
                  <i class="fa fa-circle text-amethyst" />
                </button>
                <button
                  type="button"
                  class="dropdown-item d-flex align-items-center justify-content-between fw-medium"
                  @click="store.setColorTheme({ theme: 'city' })"
                >
                  <span>Programador</span>
                  <i class="fa fa-circle text-city" />
                </button>
                <button
                  type="button"
                  class="dropdown-item d-flex align-items-center justify-content-between fw-medium"
                  @click="store.setColorTheme({ theme: 'flat' })"
                >
                  <span>Panda color</span>
                  <i class="fa fa-circle text-flat" />
                </button>
                <button
                  type="button"
                  class="dropdown-item d-flex align-items-center justify-content-between fw-medium"
                  @click="store.setColorTheme({ theme: 'modern' })"
                >
                  <span>Moderno</span>
                  <i class="fa fa-circle text-modern" />
                </button>
                <button
                  type="button"
                  class="dropdown-item d-flex align-items-center justify-content-between fw-medium"
                  @click="store.setColorTheme({ theme: 'smooth' })"
                >
                  <span>Suave</span>
                  <i class="fa fa-circle text-smooth" />
                </button>
                <!-- END Color Themes -->

                <div v-if="!store.settings.darkMode">
                  <div class="dropdown-divider" />

                  <!-- Sidebar Styles -->
                  <button
                    type="button"
                    class="dropdown-item fw-medium"
                    @click="store.sidebarStyle({ mode: 'light' })"
                  >
                    <span>Sidebar Dia</span>
                  </button>
                  <button
                    type="button"
                    class="dropdown-item fw-medium"
                    @click="store.sidebarStyle({ mode: 'dark' })"
                  >
                    <span>Sidebar Noche</span>
                  </button>
                  <!-- END Sidebar Styles -->

                  <div class="dropdown-divider" />

                  <!-- Header Styles -->
                  <button
                    type="button"
                    class="dropdown-item fw-medium"
                    @click="store.headerStyle({ mode: 'light' })"
                  >
                    <span>Header Dia</span>
                  </button>
                  <button
                    type="button"
                    class="dropdown-item fw-medium"
                    @click="store.headerStyle({ mode: 'dark' })"
                  >
                    <span>Header Noche</span>
                  </button>
                  <!-- END Header Styles -->
                </div>
              </div>
            </div>
            <!-- END Options -->
          </slot>

          <!-- Close Sidebar, Visible only on mobile screens -->
          <button
            type="button"
            class="d-lg-none btn btn-sm btn-alt-secondary ms-1"
            @click="store.sidebar({ mode: 'close' })"
          >
            <i class="fa fa-fw fa-times" />
          </button>
          <!-- END Close Sidebar -->
        </div>
        <!-- END Extra -->
      </div>
      <!-- END Side Header -->

      <!-- Sidebar Scrolling -->
      <div id="simplebar-sidebar" class="js-sidebar-scroll">
        <slot name="content">
          <!-- Side Navigation -->
          <div class="content-side">
            <BaseNavigation :nodes="navigation" />
          </div>
          <!-- END Side Navigation -->
        </slot>
      </div>
      <!-- END Sidebar Scrolling -->
    </slot>
  </nav>
  <!-- END Sidebar -->
</template>
