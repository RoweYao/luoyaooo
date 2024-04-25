/*
 * @Author: luoyaooo
 * @Date: 2024-04-16 16:08:37
 * @LastEditors: luoyaooo
 * @LastEditTime: 2024-04-16 17:21:33
 */
const { createApp, ref, computed } = Vue;

createApp({
	setup() {
		const pageNum = ref(0); // 当前滚动到第几页，从零开始
		const total = 3; // 总页数
		const showFooter = ref(false); // 是否显示footer
		const scrollStyle = computed(() => {
			return {
				transform: `translate3d(0, calc(-${pageNum.value * 100}vh - ${
					showFooter.value ? "150px" : "0px"
				}), 0)`,
			};
		}); // 滚动容器的样式
		const prevPage = () => {
			if (showFooter.value) {
				showFooter.value = false;
				return;
			}
			if (pageNum.value === 0) {
				return;
			}
			pageNum.value--;
		};
		const nextPage = () => {
			if (pageNum.value === total) {
				if (!showFooter.value) {
					showFooter.value = true;
				}
				return;
			}
			pageNum.value++;
		};
		let scrollTimer = null; // 滚动定时器
		const wheel = (e) => {
			if (scrollTimer) {
				// 简单的节流一下
				return;
			}
			const deltaY = e.deltaY;
			if (deltaY > 0) {
				// 向下滚动
				nextPage();
			}
			if (deltaY < 0) {
				// 向上滚动
				prevPage();
			}
			scrollTimer = setTimeout(() => {
				clearTimeout(scrollTimer);
				scrollTimer = null;
			}, 500);
		};

		return {
			pageNum,
			scrollStyle,
			wheel,
		};
	},
}).mount("#app");
