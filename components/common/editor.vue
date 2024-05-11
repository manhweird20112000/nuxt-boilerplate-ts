<script setup lang="ts">
import { Placeholder } from '@tiptap/extension-placeholder'
import { Table } from '@tiptap/extension-table'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableRow } from '@tiptap/extension-table-row'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { StarterKit } from '@tiptap/starter-kit'
import { Editor, EditorContent, BubbleMenu, Extension } from '@tiptap/vue-3'

interface Props {
  content?: string
}

withDefaults(defineProps<Props>(), { content: '' })
const emits = defineEmits(['update:content', 'focus', 'blur'])

const editor = ref<Editor>()

const undo = () => {
  editor.value?.chain().focus().undo().run()
}

const redo = () => {
  editor.value?.chain().focus().redo().run()
}

const italic = () => {
  editor.value?.chain().focus().setItalic().run()
}

const addTable = () => {
  editor.value?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
}

const FileHandler = Extension.create({
  name: 'FileHandler',
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('onUploadFile'),
        props: {
          handlePaste(view, event, slice) {}
        }
      })
    ]
  }
})

onMounted(() => {
  editor.value = new Editor({
    content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
    extensions: [
      StarterKit,
      Table.configure(),
      Placeholder.configure({
        placeholder: 'Write something …'
      }),
      TableRow,
      TableCell,
      TableHeader,
      FileHandler
    ],
    onUpdate() {
      emits('update:content', editor.value?.getHTML())
    },
    onFocus() {
      emits('focus')
    },
    onBlur() {
      emits('blur')
    }
  })
})

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value?.destroy()
  }
})
</script>

<template>
  <bubble-menu v-if="editor" :editor="editor" :tippy-options="{ duration: 100 }">
    <div class="flex items-center gap-x-3">
      <button @click="undo">undo</button>
      <button @click="redo">redo</button>
      <button @click="italic">Italic</button>
      <button @click="addTable">Table</button>
    </div>
  </bubble-menu>
  <editor-content :editor="editor" />
</template>

<style lang="scss">
.tiptap {
  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;

    td,
    th {
      min-width: 1em;
      border: 2px solid #ced4da;
      padding: 3px 5px;
      vertical-align: top;
      box-sizing: border-box;
      position: relative;

      > * {
        margin-bottom: 0;
      }
    }

    th {
      font-weight: bold;
      text-align: left;
      background-color: #f1f3f5;
    }

    .selectedCell:after {
      z-index: 2;
      position: absolute;
      content: '';
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(200, 200, 255, 0.4);
      pointer-events: none;
    }

    .column-resize-handle {
      position: absolute;
      right: -2px;
      top: 0;
      bottom: -2px;
      width: 4px;
      background-color: #adf;
      pointer-events: none;
    }

    p {
      margin: 0;
    }
  }
}

.tableWrapper {
  padding: 1rem 0;
  overflow-x: auto;
}

.resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}
</style>
