<script setup>
import { reactive, ref, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { NForm, NFormItem, NInput, NButton, NConfigProvider, darkTheme } from "naive-ui";
import { ServeForgetPassword } from "@/api/auth";
import { ServeSendVerifyCode, ServeSendEmailCode } from "@/api/common";
import SmsLock from "@/plugins/sms-lock";
import { isEmail, isMobile } from "@/utils/validate";

const router = useRouter();
const formRef = ref();
const rules = {
  code: {
    required: true,
    trigger: ["blur", "input"],
    message: "验证码不能为空",
  },
  username: {
    required: true,
    trigger: ["blur", "input"],
    validator(rule, value) {
      if (!value) {
        return new Error("邮箱不能为空");
      } else if (!isEmail(value)) {
        return new Error("请正确填写邮箱");
      }
      return true;
    },
  },
  password: {
    required: true,
    trigger: ["blur", "input"],
    message: "密码不能为空",
  },
};

// 短信按钮倒计时
const lockTime = ref(0);

// 初始化短信按钮锁
const lock = new SmsLock(
  "FORGET_PSW_SMS",
  60,
  (time) => (lockTime.value = time)
);

const model = reactive({
  username: "",
  password: "",
  code: "",
  loading: false,
});

const onForget = () => {
  model.loading = true;

  const response = ServeForgetPassword({
    account: model.username,
    password: model.password,
    code: model.code,
  });

  response.then((res) => {
    if (res.code == 200) {
      window["$message"].success("密码找回成功");

      setTimeout(() => {
        router.push("/auth/login");
      }, 500);
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

  formRef.value.validate((errors) => {
    !errors && onForget();
  });
};

// 发送短信
const onSendSms = () => {
  if (!isMobile(model.username)) {
    window["$message"].warning("请正确填写手机号");
    return;
  }

  const response = ServeSendVerifyCode({
    mobile: model.username,
    channel: "forget_account",
  });

  lock.start();

  response.then((res) => {
    if (res.code == 200) {
      window["$message"].success("验证码发送成功");
    } else {
      window["$message"].warning(res.message);
      lock.end();
    }
  });

  response.finally(() => {
    model.loading = false;
  });
};

// 发送邮件
const onSendEmail = () => {
  if (!isEmail(model.username)) {
    window["$message"].warning("请正确填写邮箱");
    return;
  }

  const response = ServeSendEmailCode({
    email: model.username,
    channel: "forget_account",
  });

  lock.start();

  response.then((res) => {
    if (res.code == 200) {
      window["$message"].success("验证码发送成功");
    } else {
      window["$message"].warning(res.message);
      lock.end();
    }
  });

  response.finally(() => {
    model.loading = false;
  });
};

onUnmounted(() => {
  lock.clear();
});

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
      <h2 class="card-header">找回密码</h2>
      <p class="card-subtitle">重置你的账户密码</p>

      <n-form ref="formRef" size="large" :model="model" :rules="rules" class="auth-form">
        <n-form-item path="username" :show-label="false">
          <n-input
            placeholder="邮箱"
            v-model:value="model.username"
            @keydown.enter="onValidate"
          />
        </n-form-item>

        <n-form-item path="code" :show-label="false">
          <n-input
            placeholder="验证码"
            :maxlength="6"
            v-model:value="model.code"
            @keydown.enter="onValidate"
          />
          <n-button
            tertiary
            @click="onSendEmail"
            :disabled="lockTime > 0"
            style="flex-shrink: 0; margin-left: 8px;"
          >
            获取验证码 <span v-show="lockTime > 0">({{ lockTime }}s)</span>
          </n-button>
        </n-form-item>

        <n-form-item path="password" :show-label="false">
          <n-input
            placeholder="设置密码"
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
          立即找回
        </n-button>
      </n-form>

      <div class="card-footer">
        <n-button text @click="router.push('/auth/register')" style="color: rgba(255,255,255,0.5); font-size: 13px;">
          注册账号
        </n-button>
        <n-button text @click="router.push('/auth/login')" style="color: rgba(255,255,255,0.5); font-size: 13px;">
          已有账号，立即登录?
        </n-button>
      </div>
    </div>
  </n-config-provider>
</template>

<style lang="less" scoped>
@import "@/assets/css/login.less";
</style>
