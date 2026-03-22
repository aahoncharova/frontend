<template>
  <div class="item-list">
    <ItemRow 
      v-for="task in tasks" 
      :key="task.id" 
      :task="task" 
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