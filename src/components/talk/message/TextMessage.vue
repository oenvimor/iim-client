<script setup lang="ts">
import { computed } from "vue";
import { marked } from "marked";
import { textReplaceEmoji } from "@/utils/emojis";
import { textReplaceLink, textReplaceMention } from "@/utils/strings";
import { useDialogueStore } from "@/store/dialogue";
import { Data } from "./types.d";

const props = defineProps<{
  extra: any;
  data: Data;
  maxWidth: Boolean;
}>();

const dialogueStore = useDialogueStore();

const float = props.data.float;

const isRobotMessage = computed(() => {
  return dialogueStore.isRobot && float === 'left';
});

const markdownContent = computed(() => {
  let content = props.data.content || "";

  if (isRobotMessage.value) {
    content = marked.parse(content);
    return content;
  }

  content = textReplaceLink(content);
  content = textReplaceMention(content, "#EE9028");
  content = textReplaceEmoji(content);

  return content;
});
</script>

<template>
  <div
    class="im-message-text"
    :class="{
      left: float == 'left',
      right: float == 'right',
      maxwidth: maxWidth,
      'robot-md': isRobotMessage,
    }"
  >
    <div v-html="markdownContent" />
  </div>
</template>

<style lang="less" scoped>
.im-message-text {
  min-width: 30px;
  min-height: 30px;
  padding: 3px;
  color: var(--im-message-left-text-color);
  background: var(--im-message-left-bg-color);
  border-radius: 0px 10px 10px 10px;

  &.right {
    background-color: var(--im-message-right-bg-color);
    color: var(--im-message-right-text-color);
    border-radius: 10px 0px 10px 10px;
  }

  &.maxwidth {
    max-width: 70%;
  }

  font-size: 14px;
  padding: 3px 5px;
  font-family: "PingFang SC", "Microsoft YaHei", "Alibaba PuHuiTi 2.0 45";
  line-height: 25px;

  :deep(.emoji) {
    vertical-align: text-bottom;
    margin: 0 5px;
  }

  :deep(a) {
    color: #ee9028;
    text-decoration: revert;
  }

  :deep(pre) {
    white-space: pre-wrap;
    word-break: break-word;
  }

  // Markdown rendering styles for robot messages
  &.robot-md {
    line-height: 1.6;

    :deep(h1), :deep(h2), :deep(h3), :deep(h4), :deep(h5), :deep(h6) {
      margin: 8px 0 4px;
      font-weight: 600;
      line-height: 1.4;
    }

    :deep(h1) { font-size: 1.4em; }
    :deep(h2) { font-size: 1.3em; }
    :deep(h3) { font-size: 1.2em; }
    :deep(h4) { font-size: 1.1em; }

    :deep(p) {
      margin: 4px 0;
    }

    :deep(ul), :deep(ol) {
      padding-left: 1.5em;
      margin: 4px 0;
    }

    :deep(li) {
      margin: 2px 0;
    }

    :deep(blockquote) {
      margin: 4px 0;
      padding: 2px 8px;
      border-left: 3px solid #ee9028;
      color: #888;
    }

    :deep(code) {
      background: rgba(0, 0, 0, 0.06);
      padding: 1px 4px;
      border-radius: 3px;
      font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
      font-size: 0.9em;
    }

    :deep(pre) {
      background: rgba(0, 0, 0, 0.06);
      padding: 8px 12px;
      border-radius: 6px;
      overflow-x: auto;

      code {
        background: none;
        padding: 0;
      }
    }

    :deep(table) {
      border-collapse: collapse;
      margin: 4px 0;
      width: 100%;
    }

    :deep(th), :deep(td) {
      border: 1px solid #ddd;
      padding: 4px 8px;
      text-align: left;
    }

    :deep(th) {
      background: rgba(0, 0, 0, 0.04);
      font-weight: 600;
    }

    :deep(hr) {
      border: none;
      border-top: 1px solid #ddd;
      margin: 8px 0;
    }

    :deep(img) {
      max-width: 100%;
      height: auto;
    }

    :deep(strong) {
      font-weight: 600;
    }
  }
}
</style>
