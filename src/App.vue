<script setup lang="ts">
import { ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { MainDocument } from './graphql-operations'
import RbCount from './components/RbCount.vue'

const drawer = ref(false)

const { result } = useQuery(MainDocument)
</script>

<template>
  <v-app theme="light">
    <v-navigation-drawer
        v-model="drawer"
        app
    >
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Mesa MR dashboard</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-card>
        <div class="table">
          <div class="header">Title</div>
          <div class="header">Author</div>
          <div class="header">Approval</div>
          <template v-for="mr of result?.project?.mergeRequests?.nodes || []" :key="mr!.id">
            <a class="title" :href="mr!.webUrl!"
               target="_blank">{{ mr!.title }}</a>
            <div>
              {{ mr!.author!.name }}
            </div>
            <rb-count :mr="mr"></rb-count>
          </template>
        </div>
      </v-card>
    </v-main>
  </v-app>
</template>

<style scoped>
.table {
  display: grid;
  grid-template-columns: 1fr 32ch 10ch;
  max-width: 1024px;
  margin: 0 auto;
}
.header {
  background-color: #fafafa;
  color: #424242;
}
.title {
  color: inherit;
  text-decoration: none;
}
.title:hover, .title:focus {
  text-decoration: underline;
}
.table * {
  padding: 3px 8px;
}
.table *:not(.last-row) {
  border-bottom: 1px solid #bdbdbd;
}
</style>
