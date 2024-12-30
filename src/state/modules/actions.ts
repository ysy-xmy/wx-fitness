import { defineStore } from "pinia";

export const useActionsStore = defineStore({
  id: "actions",
  state: () => ({
    classname: "",
    time: "",
    planList: {},
    chooseActions: {
      type: "",
      name: "",
    },
    chooseActionId: -Infinity,
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
    getChooseActions(): any {
      return this.chooseActions;
    },
    getChooseActionId(): number {
      return this.chooseActionId;
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
    setChooseActions(actions: any) {
      this.chooseActions = actions;
    },
    setChooseActionId(id: number) {
      this.chooseActionId = id;
    },
  },
});
