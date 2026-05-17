<script setup>
import { isElectronMode } from "@/utils/common";
import config from "../../../package.json";
</script>

<template>
  <div class="auth-page">
    <!-- Background Atmosphere -->
    <div class="auth-bg">
      <div class="auth-bg-orb orb-1"></div>
      <div class="auth-bg-orb orb-2"></div>
      <div class="auth-bg-orb orb-3"></div>
      <div class="auth-bg-grid"></div>
    </div>

    <!-- Brand Panel -->
    <div class="auth-brand">
      <img class="brand-logo" src="/logo.png" alt="IIM" />
      <h1 class="brand-name">智元 IIM</h1>
      <div class="brand-divider"></div>
      <p class="brand-slogan">
        创建你的专属 AI 助手<br />
        激发创意，让工作与生活更轻松
      </p>
    </div>

    <!-- Form Panel -->
    <div class="auth-form-panel">
      <router-view />
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "@/assets/css/login.less";
</style>
