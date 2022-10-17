const array = [
  {id:1, value:'a', parent_id:0},
  {id:2, value:'b', parent_id:0},
  {id:3, value:'c', parent_id:1},
  {id:4, value:'d', parent_id:2},
]
const trees = [
  {id:1, value:'a', parent_id:0, children: [{id:3, value:'c', parent_id:1}]},
  {id:2, value:'b', parent_id:0, children: [{id:4, value:'d', parent_id:2}]},
]
const arrayToTrees = (pid, arr) => {
  return arr.filter(item => item.parent_id === pid).map(_item => ({ ..._item, children: arrayToTrees(_item.id, arr)}))
}
