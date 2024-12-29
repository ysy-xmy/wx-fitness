import { defineStore } from "pinia";

export const useActionsStore = defineStore({
  id: "actions",
  state: () => ({
    classname: "",
    time: "",
    planList: {},
  }),
  getters: {
    getPlanList(): any {
      return this.planList;
    },
    getTime(): string {
      return this.time;
    },
    getClassname(): string {
      return this.classname;
    },
  },
  actions: {
    setPlanList(list: any) {
      this.planList = list;
    },
    setTime(time: string) {
      this.time = time;
    },
    setClassname(classname: string) {
      this.classname = classname;
    },
  },
});
