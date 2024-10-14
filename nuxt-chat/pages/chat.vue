<template>
  <UCard :ui="{ body: { padding: 'p-0' } }">
    <template #header>
      <div class="flex items-center justify-between text-primary">
        <div class="flex items-center gap-x-2">
          <UIcon name="i-heroicons-chat-bubble-left-right" class="w-6 h-6 font-semibold" />
          <div class="text-primary font-semibold text-center text-xl">
            Nuxt Chaaaat
          </div>
        </div>
        <div class="bg-primary px-3 py-1.5 text-white cursor-pointer" @click="() => navigateTo('/')">
          {{ $route.query.room }} から退出
        </div>
      </div>
    </template>

    <div class="flex">
      <!-- sidebar -->
      <div class="bg-slate-100 py-4 px-6">
        <div class="mb-4">
          <div class="flex items-center gap-x-2 mb-2 px-3 py-1.5 rounded-md bg-white text-black">
            <UIcon name="i-heroicons-chat-bubble-bottom-center-text" class="w-6 h-6 font-semibold" />
            <div class="text-base">部屋の名前</div>
          </div>
          <div class="text-gray-500 hover:text-gray-900 mb-2 captalize text-base ml-2">
            {{ currentRoom }}
          </div>
        </div>
        <div>
          <div class="flex items-center gap-x-2 mb-2 px-3 py-1.5 rounded-md bg-white text-black">
            <UIcon name="i-heroicons-user-group" class="w-6 h-6 font-semibold" />
            <div class="text-base">ユーザー</div>
          </div>
        </div>
        <div v-for="(user, i) in users" :key="i" class="text-gray-500 hover:text-gray-900 mb-2 captalize text-base ml-2"
          :class="{ 'border-b border-primary': user.username === route.query.username }">
          {{ user.username }}
        </div>
      </div>
    </div>

    <!-- chat -->
    <div class="h-96 overflow-y-auto px-8 py-10 flex-1">
      <div class="bg-trasnparent w-full mb-3 flex" v-for="(chat, i) in chats" :key="i" :class="{
        'justify-center': chat.username === 'NuxtChat Admin',
        'jusiify-end': chat.username === route.query.username,
        'justify-start': chat.username !== route.query.username && chat.username !== 'NuxtChat Admin',
      }">
        <div class="px-6 py-2 w-1/2 rounded-md mb-3" :class="{
          'bg-red-100': chat.username === 'NuxtChat Admin',
          'bg-primary/20': chat.username === route.query.username,
          'bg-green-300': chat.username !== route.query.username && chat.username !== 'NuxtChat Admin',
        }">
          <div class="flex items-center gap-x-3">
            <div class="text-xs text-primary font-semibold">{{ chat.username }}</div>
            <div class="text-xs">{{ chat.time }}</div>
          </div>
          <div class="mt-1 text-base">
            {{ chat.text }}
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <form @submit.prevent="sendMessage">
        <UInput v-model="message" placeholder="メッセージを入力してください" :ui="{ padding: { xs: 'px-6 py-10' } }">
          <template #trailing>
            <UButton icon="i-heroicons-paper-airplane" size="xs" color="primary" variant="solid" :trailing="false"
              label="送信" class="my-3" type="submit" />
          </template>
        </UInput>
      </form>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
const route = useRoute();

type Chat = {
  username: string;
  text: string;
  time: string;
  room?: string;
};
type User = {
  id: string;
  username: string;
  room: string;
}

const message = ref("");
const chats = ref<Chat[]>([]);
const users = ref<User[]>([]);
const currentRoom = ref("");

const sendMessage = () => {
  console.log(message.value);
}


onMounted(() => {
  const { username, room } = route.query as Partial<Chat>;
  if (!username || !room) {
    navigateTo('/');
  }
});

onBeforeUnmount(() => {
  // cleanup
});
</script>

<style></style>