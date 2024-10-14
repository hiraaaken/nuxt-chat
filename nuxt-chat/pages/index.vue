<template>
  <div>
    <UCard class="max-w-[600px] mx-auto" :ui="{ body: { padding: 'p-5 sm:p-8' } }">
      <template #header>
        <div class="flex items-center justify-center gap-x-3 text-primary">
          <UIcon name="i-heroicons-chat-bubble-left-right" class="w-9 h-9 font-semibold" />
          <div class="text-primary font-semibold text-center text-3xl">
            Nuxt Chaaaat
          </div>
        </div>
      </template>

      <UForm :state="state" @submit="onSubmit" class="space-y-6">
        <UFormGroup label="名前" name="username">
          <UInput v-model="state.username" />
        </UFormGroup>

        <UFormGroup label="部屋" name="room">
          <USelect v-model="state.room" :options="rooms" />
        </UFormGroup>

        <UButton type="submit" size="xl" block :disabled="!state.username || !state.room">
          チャットを始める
        </UButton>
      </UForm>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";

const rooms = ['nuxt instllation', 'nuxt guide', 'nuxt api', 'nuxt examples'];
const state = reactive({
  username: '',
  room: rooms[0],
});

const onSubmit = async (event: FormSubmitEvent<{ username: string; rooms: string }>) => {
  navigateTo(`/chat?username=${state.username}&room=${state.room}`);
}
</script>

<style scoped></style>