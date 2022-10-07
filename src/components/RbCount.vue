<script setup lang="ts">
import { MainQuery } from '../graphql-operations'
import { computed, toRef } from 'vue'

type MrQuery = NonNullable<NonNullable<NonNullable<MainQuery['project']>['mergeRequests']>['nodes']>[number];

const rbRegex = /^Reviewed-[Bb]y: (.+) <(.+)>$/

const props = defineProps<{ mr: MrQuery }>()
const mr = toRef(props, 'mr')
const commits = computed(() => mr.value?.commits?.nodes?.length)
const rbCount = computed(() => mr.value?.commits?.nodes?.filter((x) => x?.message?.split('\n')?.some((l) => l.match(rbRegex))).length)
// eslint-disable-next-line no-unused-vars
const rbMembers = computed(() => mr.value?.commits?.nodes?.flatMap((x) => x?.message?.split('\n')?.map((l) => l.match(rbRegex)?.[2]).filter(x => x != null)) || [])

const colors = {
  green: {
    fg: '#1b5e20',
    bg: '#e8f5e9'
  },
  blue: {
    fg: '#1565c0',
    bg: '#e3f2fd'
  },
  gray: {
    fg: '#616161',
    bg: '#fafafa'
  }
}
const color = computed(() => colors[
  rbCount.value === commits.value ? 'green' : rbCount.value === 0 ? 'gray' : 'blue']
)
</script>

<template>
  <div class="rb">
    <span style="text-align: right">{{ rbCount }}</span><span>/</span><span style="text-align: left">{{ commits }}</span>
  </div>
</template>

<style scoped>
.rb {
  color: v-bind('color.fg');
  background-color: v-bind('color.bg');
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  column-gap: 6px;
}
</style>
