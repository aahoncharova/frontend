<template>
  <div class="item-list">
    <ItemRow 
      v-for="task in tasks" 
      :key="task.id" 
      :task="task" 
      @toggle="$emit('toggle', task.id)"
      @delete="$emit('delete', task.id)"
    />
  </div>
</template>

<script>
  import ItemRow from './ItemRow.vue';
  export default {
    props: { tasks: Array },
    components: { ItemRow }
  };
</script>