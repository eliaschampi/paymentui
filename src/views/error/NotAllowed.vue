<script setup></script>

<template>
    <!-- Page Content -->
    <div class="hero">
        <div class="hero-inner text-center">
            <div class="bg-body-extra-light">
                <div class="content content-full overflow-hidden">
                    <div class="py-4">
                        <!-- Error Header -->
                        <h1 class="display-1 fw-bolder text-smooth">403</h1>
                        <h2 class="h4 fw-normal text-muted mb-5">
                            Es posible que tu rol no cumpla con dicha habilidad
                        </h2>
                        <!-- END Error Header -->
                    </div>
                </div>
            </div>
            <div class="content content-full text-muted fs-sm fw-medium">
                <!-- Error Footer -->
                <p class="mb-1">¿Deseas descubrir mas de nosotros?</p>
                <a class="link-fx" href="javascript:void(0)">Reportar</a> O
                <RouterLink :to="{ name: 'home' }" class="link-fx">
                    Salvarse
                </RouterLink>
                <!-- END Error Footer -->
            </div>
        </div>
    </div>
    <!-- END Page Content -->
</template>
