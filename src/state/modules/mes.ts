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
    getList: (state) => {
      return state.list;
    },
    mesList: (state) => state.list || [],
  },
  actions: {
    //只显示未读
    showUnread() {
      return new Promise((resolve, reject) => {
        getWithoutRead({ userId: (useAuthStore().user as any).id }).then(
          (res: any) => {
            if (res.code === 200) {
              this.setList(res.data.Notifications || []);
              this.setTotal(res.data.Total || 0);
              resolve(res);
            } else {
              reject(false);
            }
          }
        );
      });
    },
    //获取消息列表
    addMesList(data: any) {
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
      if (!uni.getStorageSync("token")) return;
      console.log("创建socket");
      if (
        this.status ||
        this.createCount >= this.maxCreateCount ||
        this.socket
      ) {
        return;
      }

      const wsUrl =
        "ws://47.115.173.204:8081/api/notifier/conn?userId=" +
        (useAuthStore().user as any).id;
      const token = uni.getStorageSync("token") || "";

      try {
        // 关闭可能存在的旧连接
        if (this.socket) {
          try {
            uni.closeSocket();
          } catch (e) {
            console.log("关闭旧连接失败", e);
          }
          this.socket = null;
        }

        uni.connectSocket({
          url: wsUrl,
          header: {
            Authorization: token,
          },
          success: () => {
            console.log("Socket连接请求已发送");
          },
          fail: (error) => {
            console.error("Socket连接请求失败", error);
            this.createCount++;

            if (this.createCount < this.maxCreateCount) {
              setTimeout(() => {
                console.log(`尝试第${this.createCount}次重连...`);
                this.createSocket();
              }, 2000);
            }
          },
        });

        // 监听连接打开事件
        uni.onSocketOpen(() => {
          console.log("WebSocket连接已建立!");
          this.status = true;
          this.socket = true;
          this.createCount = 0;

          // 设置心跳机制，每10秒发送一次ping
          const heartbeatInterval = setInterval(() => {
            if (this.socket && this.status) {
              uni.sendSocketMessage({
                data: "ping",
                success: () => {
                  console.log("心跳消息已发送");
                },
                fail: (error) => {
                  console.error("心跳消息发送失败", error);
                  clearInterval(heartbeatInterval);
                },
              });
            } else {
              clearInterval(heartbeatInterval);
            }
          }, 10000);
        });

        // 监听接收消息事件
        uni.onSocketMessage((res: any) => {
          console.log(res.data, "收到消息");
          try {
            const data = JSON.parse(res.data);
            // 可以添加对不同类型消息的处理逻辑
          } catch (e) {
            console.error("解析消息失败:", e);
          }
        });

        // 监听连接关闭事件
        uni.onSocketClose(() => {
          console.log("WebSocket连接已断开");
          this.status = false;
          this.socket = null;
          this.createCount++;

          // 尝试重连
          if (this.createCount < this.maxCreateCount) {
            setTimeout(() => {
              console.log(`尝试第${this.createCount}次重连...`);
              this.createSocket();
            }, 2000);
          }
        });

        // 监听连接错误事件
        uni.onSocketError((error) => {
          console.error("WebSocket连接错误:", error);
          uni.showToast({
            title: "连接错误",
            icon: "error",
          });

          this.status = false;
        });
      } catch (error) {
        console.error("创建WebSocket实例失败:", error);
        this.createCount++;

        // 尝试重连
        if (this.createCount < this.maxCreateCount) {
          setTimeout(() => {
            this.createSocket();
          }, 2000);
        }
      }
    },
    closeSocket() {
      if (this.socket) {
        try {
          uni.closeSocket({
            success: () => {
              console.log("WebSocket已手动关闭");
            },
          });
        } catch (error) {
          console.error("关闭WebSocket时出错:", error);
        } finally {
          this.socket = null;
          this.status = false;
        }
      }
    },
  },
});
