import { getNotifyList, getWithoutRead } from "@/api/notify";
import { defineStore } from "pinia";

export const usemesStore = defineStore({
  id: "mesStore",
  state: (): any => ({
    hadNew: "", // 是否有新的消息
    list: [], // 消息列表
    total: 0,
    socket: null, // socket
    createCount: 0, // 创建socket的次数
    status: false, // 是否连接成功
    maxCreateCount: 5, // 最大创建次数
  }),
  getters: {
    gethadNew: (state) => {
      return state.hadNew as string;
    },
    getList: (state) => {
      return state.list as any[];
    },
  },
  actions: {
    //只显示未读
    showUnread() {
      return new Promise((resolve, reject) => {
        getWithoutRead().then((res: any) => {
          if (res.code === 200) {
            this.setList(res.data.list);
            this.setTotal(res.data.total);
            this.resolve(res);
          } else {
            reject(false);
          }
        });
      });
    },
    //获取消息列表
    addMesList() {
      return new Promise((resolve, reject) => {
        getNotifyList().then((res: any) => {
          if (res.code === 200) {
            this.setList(res.data.list);
            this.setTotal(res.data.total);
            this.resolve(res);
          } else {
            reject(false);
          }
        });
      });
    },
    sethadNew(state: boolean) {
      this.hadNew = state;
    },
    setTotal(state: number) {
      this.total = state;
    },
    setList(state: any) {
      this.list.push(state);
    },
    setClear() {
      return;
    },
    changeStatus(id: string) {
      this.list.find((item: any) => item.id === id).status = 1;
    },
    createSocket() {
      console.log("创建socket");
      if (
        this.status ||
        this.createCount >= this.maxCreateCount ||
        this.socket
      ) {
        return;
      }
      this.socket = uni.connectSocket({
        url: "ws://47.115.173.204:8081/api/notifier/conn",
        success: () => {
          console.log("Socket连接成功");
        },
      });
      this.socket.onOpen = () => {
        this.status = true;
        this.createCount = 0;
      };
      this.socket.onMessage = (e: any) => {
        console.log(e);
      };
      this.socket.onClose = () => {
        this.status = false;
        this.createCount++;
        if (this.createCount < this.maxCreateCount) {
          this.createSocket();
        }
      };
      this.socket.onError = (e: any) => {
        uni.showToast({
          title: e,
          icon: "error",
        });
        this.status = false;
        this.createCount++;
        if (this.createCount < this.maxCreateCount) {
          this.createSocket();
        }
      };
    },
  },
});
