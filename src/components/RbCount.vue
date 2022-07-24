<script setup lang="ts">
import { MainQuery } from '../graphql-operations'
import { computed, toRef } from 'vue'

type MrQuery = NonNullable<NonNullable<NonNullable<MainQuery['project']>['mergeRequests']>['nodes']>[number];

const rbRegex = /^Reviewed-[Bb]y: (.+) <(.+)>$/

const props = defineProps<{mr: MrQuery}>()
const mr = toRef(props, 'mr')
const commits = computed(() => mr.value?.commits?.nodes?.length)
const rbCount = computed(() => mr.value?.commits?.nodes?.filter((x) => x?.message?.split('\n')?.some((l) => l.match(rbRegex))).length)
// eslint-disable-next-line no-unused-vars
const rbMembers = computed(() => mr.value?.commits?.nodes?.flatMap((x) => x?.message?.split('\n')?.map((l) => l.match(rbRegex)?.[2]).filter(x => x != null)) || [])
</script>

<template>
  <v-chip :color="rbCount === commits ? 'green' : rbCount === 0 ? 'gray' : 'blue'">
    Rb {{ rbCount }} / {{ commits }}
  </v-chip>
</template>
