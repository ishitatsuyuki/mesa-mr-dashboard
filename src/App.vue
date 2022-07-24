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
        <v-list lines="two">
          <v-list-item v-for="mr of result?.project?.mergeRequests?.nodes || []" :key="mr!.id" :href="mr!.webUrl!" target="_blank">
            <v-list-item-header>
            <v-list-item-title>{{ mr!.title }}</v-list-item-title>
            <v-list-item-subtitle>
              by
              {{ mr!.author!.name }}
            </v-list-item-subtitle>
              <rb-count :mr="mr"></rb-count>
            </v-list-item-header>
          </v-list-item>
        </v-list>
      </v-card>
    </v-main>
  </v-app>
</template>
