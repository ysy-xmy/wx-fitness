import { getNotifyList, getWithoutRead } from "@/api/notify";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
export const usemesStore = defineStore({
  id: "mesStore",
  state: (): any => ({
    hadNew: 0, // 是否有新的消息
    list: [], // 消息列表
    total: 0,
    socket: null, // socket
    createCount: 0, // 创建socket的次数
    status: false, // 是否连接成功
    maxCreateCount: 5, // 最大创建次数
  }),
  getters: {
    gethadNew: (state) => {
      return state.hadNew as number;
    },
    getList: () => {
      return this.list;
    },
    mesList: (state) => state.list || [],
  },
  actions: {
    //只显示未读
    showUnread() {
      return new Promise((resolve, reject) => {
        getWithoutRead().then((res: any) => {
          if (res.code === 200) {
            this.setList(res.data.Notifications || []);
            this.setTotal(res.data.Total || 0);
            this.resolve(res);
          } else {
            reject(false);
          }
        });
      });
    },
    //获取消息列表
    addMesList(data) {
      return new Promise((resolve, reject) => {
        console.log(data, "data");
        let url = "";
        if (data.type === "noRead") {
        } else {
          url = `/api/notifier/list`;
        }
        getNotifyList(data, url).then((res: any) => {
          console.log(res, "res");
          if (res.data.code === 200 && res.data.data) {
            console.log(res.data.data, "res.data");
            this.setList(res.data.data.Notifications || []);
            this.setTotal(res.data.data.Total || 0);
            resolve(res.data);
          } else {
            reject(false);
          }
        });
      });
    },
    sethadNew(state: number) {
      this.hadNew = state;
    },
    setTotal(state: number) {
      this.total = state;
    },
    setList(state: any) {
      // console.log(state, "state");
      // return;
      this.list.push(...state);
      console.log(this.list, "this.list");
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
        url: "ws://47.115.173.204:8082/api/notifier/conn",
        header: {
          Authorization: uni.getStorageSync("token"),
        },
        success: () => {
          console.log("Socket连接成功");
          getWithoutRead({ userId: useAuthStore().user.id }).then(
            (res: any) => {
              if (res.code === 200) {
                this.sethadNew(res.data || 0);
                // this.setList(res.data.Notifications || []);
                // this.setTotal(res.data.Total || 0);
              }
            }
          );
        },
        fail: (e) => {
          console.log(e, "连接失败");
        },
      });
      this.socket.onOpen = () => {
        this.status = true;
        this.createCount = 0;
      };
      this.socket.onMessage = (e: any) => {
        console.log(e, "收到消息");
      };
      this.socket.onClose = (e) => {
        console.log(e, "断开");
        this.status = false;
        this.createCount++;
        if (this.createCount < this.maxCreateCount) {
          this.createSocket();
        }
      };
      this.socket.onError = (e: any) => {
        console.log(e, "错误");
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
    closeSocket() {
      this.socket.close();
      this.socket = null;
    },
  },
});
