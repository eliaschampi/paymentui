<script>
export default {
  props: {
    username: String,
    email: String,
    is_staff: [Boolean, Number]
  }
};
</script>

<template>
  <div class="col-md-6 col-xl-3">
    <a class="block block-rounded block-link-pop text-center" href="javascript:void(0)">
      <div class="block-content block-content-full bg-image"
        style="background-image: url('assets/media/images/head.jpg')">
        <img class="img-avatar img-avatar-thumb" src="assets/media/images/user.png" alt="" />
      </div>
      <div class="block-content block-content-full">
        <p class="fw-semibold mb-0">{{ username }}</p>
        <p class="fs-sm fw-medium text-muted mb-0">
          {{ email }}
        </p>
        <div class="badge bg-info">
          {{ is_staff? "Administrador": "usuario" }}
        </div>
      </div>
    </a>
  </div>
</template>
