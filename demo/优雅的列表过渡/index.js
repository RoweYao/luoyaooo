/*
 * @Author: luoyaooo
 * @Date: 2023-05-08 10:22:14
 * @LastEditors: luoyaooo
 * @LastEditTime: 2023-05-08 12:26:14
 */
const { createApp } = Vue;

createApp({
  data() {
    return {
      list: [1, 2, 3, 4],
      colorMap: [
        "#f3a683",
        "#f7d794",
        "#778beb",
        "#e77f67",
        "#cf6a87",
        "#786fa6",
        "#f8a5c2",
        "#63cdda",
        "#f19066",
        "#3dc1d3",
      ],
    };
  },
  methods: {
    getRandomIndex() {
      let len = this.list.length - 1;
      if (len === -1) return 0;
      return Math.floor(Math.random() * len);
    },
    delOne() {
      if (this.list.length - 1 === -1) return;
      let delIndex = this.getRandomIndex();
      this.list.splice(delIndex, 1);
    },
    insertOne() {
      let insertIndex = this.getRandomIndex(),
        insertNum = Math.max(...this.list, 0) + 1;
      this.list.splice(insertIndex, 0, insertNum);
    },
  },
}).mount("#app");
