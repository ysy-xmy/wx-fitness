/**
 * @author zhouyankai
 * @description 这是公用的utils方法
 * @Date: 2022-07-31
 */

/**
 * 判断url是否是http或https
 * @param {string} path
 * @returns {Boolean}
 */
export function isHttp(url: string) {
  return url.indexOf("http://") !== -1 || url.indexOf("https://") !== -1;
}

/**
 * 判断是否为空 空为true 不是空为false
 */
export function validatenull(val: null | undefined | string) {
  return (
    val === null ||
    val === undefined ||
    val === "" ||
    (Array.isArray(val) && val.length === 0) ||
    (typeof val === "object" && Object.keys(val).length === 0)
  );
}

/**
 * D定义一个用于分页获取的类
 */
interface dataType {
  Page: number;
  Size: number;
}

interface stateType extends dataType {
  total: number;
  init: () => void;
  changeData: () => void;
  list: any[];
  fun: (Size: number, Page: number) => Promise<any>;
  dispose: (data: dataType) => object;
}

export class State implements stateType {
  Page: number = 1;
  Size: number = 5;
  total: number = 1;
  list: any[] = [];
  fun: (Size: number, Page: number) => Promise<any>;
  dispose: (data: dataType) => object;

  // Constructor to initialize `fun` and `dispose`
  constructor(
    fun: (Size: number, Page: number) => Promise<any>,
    dispose: (data: dataType) => object
  ) {
    this.fun = fun;
    this.dispose = dispose;
  }

  // Initialize the state
  init() {
    this.list = [];
    this.Page = 1;
    this.changeData();
  }

  // Fetch and update the list
  changeData() {
    this.fun(this.Size, this.Page).then((res: any) => {
      res.data.list.forEach((item: any) => {
        this.list.push(this.dispose ? this.dispose(item) : item);
      });
      console.log(this.list, "this.list");
      this.Page++;
    });
  }
}
