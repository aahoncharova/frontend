<template>
  <div class="item-list">
    <h3>Your Tasks</h3>
    <ItemRow />
  </div>
</template>

<script>
    import ItemRow from './ItemRow.vue';
    export default {
    components: { ItemRow }
    };
</script>