<template>
  <div>
      <b-form-group
      label-for="table-select-mode-select"
      label-cols-md="4"
    >
    </b-form-group>
    <b-table
      :items="this.games"
      :fields="this.fields"
      responsive="sm"
      ref="selectableTable"
      selectable
      @row-selected="onRowSelected"
    >
    
      <!-- Example scoped slot for select state illustrative purposes -->
      <template #cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span aria-hidden="true">&check;</span>
          <span class="sr-only">Selected</span>
        </template>
        <template v-else>
          <span aria-hidden="true">&nbsp;</span>
          <span class="sr-only">Not selected</span>
        </template>
      </template>
    </b-table>
  </div>
</template>

<script>
  export default {
    name: "FutureGames",
    props: {
      games: {
        type: Array,
        required: true
      },
      fields: {
        type: Array,
        required: true
      },
      selected: {
        type: Array,
        required: true
      },
    },
    methods: {
      onRowSelected(items) {
        this.selected = items
      },
      selectAllRows() {
        this.$refs.selectableTable.selectAllRows()
      },
      clearSelected() {
        this.$refs.selectableTable.clearSelected()
      },
        removefromfavorites() {
        // Rows are indexed from 0, so the third row is index 2
        console.log(this.selected);
      },
    }
  }