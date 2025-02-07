import { defineStore } from "pinia";

export const useActionsStore = defineStore({
  id: "actions",
  state: () => ({
    findActionData: {},
    classname: "",
    time: "",
    planList: {},
    classID: "", //最外层的课程的ID
    coachId: 0, //教练的ID
    chooseActions: {
      type: "",
      name: "",
    },
    chooseActionId: -Infinity,
  }),
  getters: {
    getFindActionData(): any {
      return this.findActionData;
    },
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
    getClassID(): string {
      return this.classID;
    },
    getCoachID(): number {
      return this.coachId;
    },
  },
  actions: {
    setClassID(id: string) {
      this.classID = id;
    },
    setFindActionData(data: any) {
      this.findActionData = data;
    },
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
    setCoachID(id: number) {
      this.coachId = id;
    },
  },
});
