The full data table: sortable headers, row selection with a selection toolbar, sticky header and a footer.

**Provide:** `.gf-table-wrap` (+ `data-density="compact"`) → optional `.gf-table-toolbar--selection` (`data-gf-selection`, `data-gf-count`), `.gf-table` (+ `--sticky`) with `th[aria-sort]` holding `.gf-sort` buttons, a `.gf-select` checkbox column (`aria-selected` on selected rows; select-all goes indeterminate), `.gf-num` numeric columns, `.gf-table-foot`. Your code sorts and tracks selection.
