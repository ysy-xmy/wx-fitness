import { defineStore } from "pinia";

interface TabbarState {
  show: boolean;
}

export const useTabbarStore = defineStore({
  id: "tabbar",
  state: (): TabbarState => ({
    show: true,
  }),
  actions: {
    setShow(show: boolean) {
      this.show = show;
    },
  },
});

