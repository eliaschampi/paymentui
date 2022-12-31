<script setup>
import { reactive, onMounted, onUnmounted } from "vue";
import { useTemplateStore } from "@/stores/template";

// SimpleBar, for more info and examples you can check out https://github.com/Grsmto/simplebar/tree/master/packages/simplebar-vue
import SimpleBar from "simplebar";

// Main store
const store = useTemplateStore();

// Reactive state
const state = reactive({
  settings: {
    status: true,
    updated: true,
    notifications: {
      email: true,
      sms: true
    },
    api: true
  }
});

// Close side overlay on ESCAPE key down
function eventSideOverlay(event) {
  if (event.which === 27) {
    event.preventDefault();
    store.sideOverlay({ mode: "close" });
  }
}

// Init SimpleBar (custom scrolling) and attach ESCAPE key event listener
onMounted(() => {
  new SimpleBar(document.getElementById("side-overlay"));

  document.addEventListener("keydown", eventSideOverlay);
});

// Remove keydown event listener
onUnmounted(() => {
  document.removeEventListener("keydown", eventSideOverlay);
});
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
            <img
              class="img-avatar img-avatar32"
              src="/assets/media/images/add.png"
              alt="Avatar"
            />
          </a>
          <!-- END User Avatar -->

          <!-- User Info -->
          <div class="ms-2">
            <a class="text-dark fw-semibold fs-sm" href="javascript:void(0)">
              Nuevo Servicio
            </a>
          </div>
          <!-- END User Info -->
        </slot>

        <!-- Close Side Overlay -->
        <button
          type="button"
          class="ms-auto btn btn-sm btn-alt-danger"
          @click="store.sideOverlay({ mode: 'close' })"
        >
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
          </BaseBlock>
          <!-- END Side Overlay Tabs -->
        </div>
        <!-- END Side Content -->
      </slot>
    </slot>
  </aside>
  <!-- END Side Overlay -->
</template>
