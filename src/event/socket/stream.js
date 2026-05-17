import Base from './base'
import { useDialogueStore } from '@/store/dialogue'
import { useTalkStore } from '@/store'
import * as message from '@/constant/message'
import { parseTime } from '@/utils/datetime'

/**
 * 流式消息事件处理
 */
class StreamEvent extends Base {
  resource
  sender_id = 0
  receiver_id = 0
  talk_type = 0

  constructor(resource) {
    super()

    this.sender_id = resource.sender_id
    this.receiver_id = resource.receiver_id
    this.talk_type = resource.talk_type
    this.resource = resource

    this.handle()
  }

  isCurrSender() {
    return this.sender_id == this.getAccountId()
  }

  getIndexName() {
    if (this.talk_type == 2) {
      return `${this.talk_type}_${this.receiver_id}`
    }
    return `${this.talk_type}_${this.sender_id}`
  }

  handle() {
    const dialogueStore = useDialogueStore()

    // 只处理当前对话窗口的消息
    if (dialogueStore.index_name !== this.getIndexName()) {
      return
    }

    const { event, content } = this.resource

    switch (event) {
      case 'start':
        dialogueStore.startStreamMessage(this.sender_id)
        break

      case 'chunk':
        dialogueStore.appendStreamContent(this.sender_id, content)
        break
    }
  }
}

export default StreamEvent
