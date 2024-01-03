<template>
  <div class="p-4 xl:p-6 flex flex-col gap-6 bg-[#FFF] rounded-xl shadow-xs mb-6">
    <div class="flex flex-row justify-between w-full">
      <span class="text-neutral-700 text-base font-medium leading-6">Add a note for this order</span>
      <button class="group" @click="textBoxOpen = !textBoxOpen">
        <EditBig class="text-[#5E6278] group-hover:text-[#007FFF] transition duration-300"/>
      </button>
    </div>
    <div v-if="textBoxOpen">
            <textarea
                v-model="note" :rows="rows" maxlength="170"
                class="no-focus thin-scrollbar w-full p-3 text-neutral-700 text-sm font-normal leading-6 bg-[#F9F9F9] rounded-lg border border-[#D4D4D4] resize-none"
                placeholder="Type your note here..."
                @input="adjustHeight"
                @focusout="UpdateNote"></textarea>

    </div>
  </div>
</template>
<script lang="ts">
import EditBig from '~/assets/icons/edit-big.svg'
import Emitter from 'tiny-emitter/instance.js';

const lastNote = ref('')
export default defineComponent({
  name: 'NoteSection',
  components: {
    EditBig,
  },
  data() {
    return {
      textBoxOpen: false,
      note: '',
      rows: 2,
    };
  },
  methods: {
    adjustHeight() {
      this.rows = this.note.split('\n').length;
      if (this.rows > 6) {
        this.rows = 6;
      }
      if (this.rows < 2) {
        this.rows = 2;
      }
    },
    UpdateNote() {
      if (this.note !== lastNote.value) {
        Emitter.emit('note', this.note);
        lastNote.value = this.note;
      }
    }
  }

})


</script>
<style scoped>
.no-focus:focus {
  outline: none;
  border-color: #D4D4D4;
}

.thin-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.thin-scrollbar::-webkit-scrollbar-track {
  background: #F9F9F9;
}

.thin-scrollbar::-webkit-scrollbar-thumb {
  background-color: #D4D4D4;
  border-radius: 20px;
  border: 3px solid #F9F9F9;
}
</style>
