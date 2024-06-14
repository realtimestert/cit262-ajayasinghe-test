// export function forEach(items, callback) {
//     for (const item of items) {
//       callback(item);
//     }
//   }

module.exports = function forEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
};