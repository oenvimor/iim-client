<script setup>
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { NForm, NFormItem, NButton, NInput, NConfigProvider, darkTheme } from "naive-ui";
import { ServeLogin } from "@/api/auth";
import { setAccessToken } from "@/utils/auth";
import { palyMusic } from "@/utils/talk";
import socket from "@/socket";
import { useUserStore } from "@/store/user";

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const formRef = ref();
const rules = {
  username: {
    required: true,
    trigger: ["blur", "input"],
    message: "账号不能为空",
  },
  password: {
    required: true,
    trigger: ["blur", "input"],
    message: "密码不能为空",
  },
};

const model = reactive({
  username: "",
  password: "",
  loading: false,
});

const onLogin = () => {
  model.loading = true;
  const response = ServeLogin({
    account: model.username,
    password: model.password,
    platform: "web",
  });
  response.then(async (res) => {
    if (res.code == 200) {
      window["$message"].success("登录成功");
      setAccessToken(res.data.access_token, res.data.expires_in);
      socket.connect();
      userStore.loadSetting();
      router.push(route.query.redirect || "/");
    } else {
      window["$message"].warning(res.message);
    }
  });
  response.finally(() => {
    model.loading = false;
  });
};

const onValidate = (e) => {
  e.preventDefault();
  palyMusic(true);
  formRef.value.validate((errors) => {
    !errors && onLogin();
  });
};

const themeOverrides = {
  common: {
    primaryColor: "#EE9028",
    primaryColorHover: "#f0a840",
    primaryColorPressed: "#d48020",
    primaryColorSuppl: "#EE9028",
  },
  Input: {
    color: "rgba(255, 255, 255, 0.04)",
    colorFocus: "rgba(255, 255, 255, 0.06)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderHover: "1px solid rgba(255, 255, 255, 0.14)",
    borderFocus: "1px solid rgba(238, 144, 40, 0.45)",
    textColor: "rgba(255, 255, 255, 0.88)",
    placeholderColor: "rgba(255, 255, 255, 0.28)",
    borderRadius: "10px",
    heightLarge: "48px",
    fontSizeLarge: "15px",
    paddingLarge: "0 16px",
    boxShadowFocus: "0 0 0 3px rgba(238, 144, 40, 0.1)",
  },
  Button: {
    textColor: "#fff",
    textColorHover: "#fff",
    textColorPressed: "#fff",
    borderRadiusMedium: "10px",
    heightLarge: "48px",
    fontSizeLarge: "15px",
    fontWeightStrong: "600",
    colorPrimary: "#EE9028",
    colorHoverPrimary: "#f0a840",
    colorPressedPrimary: "#d48020",
    borderPrimary: "1px solid transparent",
  },
};
</script>

<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
    <div class="auth-card">
      <div class="card-accent-line"></div>
      <h2 class="card-header">欢迎回来</h2>
      <p class="card-subtitle">登录你的账户以继续</p>

      <n-form
        ref="formRef"
        size="large"
        :model="model"
        :rules="rules"
        class="auth-form"
      >
        <n-form-item path="username" :show-label="false">
          <n-input
            placeholder="邮箱 / 手机号"
            v-model:value="model.username"
            @keydown.enter="onValidate"
          />
        </n-form-item>

        <n-form-item path="password" :show-label="false">
          <n-input
            placeholder="请输入密码"
            type="password"
            show-password-on="click"
            v-model:value="model.password"
            @keydown.enter="onValidate"
          />
        </n-form-item>

        <n-button
          type="primary"
          size="large"
          block
          @click="onValidate"
          :loading="model.loading"
          style="margin-top: 4px"
        >
          立即登录
        </n-button>
      </n-form>

      <div class="card-footer">
        <n-button text @click="router.push('/auth/forget')" style="color: rgba(255,255,255,0.5); font-size: 13px;">
          找回密码
        </n-button>
        <n-button text @click="router.push('/auth/register')" style="color: rgba(255,255,255,0.5); font-size: 13px;">
          还没有账号？立即注册
        </n-button>
      </div>
    </div>
  </n-config-provider>
</template>

<style lang="less" scoped>
@import "@/assets/css/login.less";
</style>
