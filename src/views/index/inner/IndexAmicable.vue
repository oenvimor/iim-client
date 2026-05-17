<template>
  <div class="amicable flex-center">
    <div class="content">
      <img src="@/assets/image/welcome.svg" alt="" />
      <p><b>智元 IIM 欢迎您</b></p>
    </div>
  </div>
</template>

<style lang="less" scoped>
.amicable {
  height: 100%;
  width: 100%;
  -webkit-app-region: drag;
  background: transparent;

  .content {
    width: 400px;
    height: 300px;
    text-align: center;
    margin-top: -10%;
    font-size: 18px;
    font-weight: 300;
    color: var(--im-text-color-grey);

    p {
      margin-top: 24px;
      color: var(--im-text-color-grey);
      font-weight: 300;
      letter-spacing: 1px;

      b {
        font-weight: 500;
        color: var(--im-text-color);
      }
    }
  }
}
</style>
