import {ObjectedMap} from "../ObjectedMap";
import {JSONObject} from "../JSONObject";

/**
 * 路径参数解析
 */
export class HttpPathParam<T extends object> extends ObjectedMap<T> {
  constructor(value: T) {
    super();
    (<Array<keyof T>>Object.keys(value)).forEach(key => {
      this.set(key, value[key]);
    })
  }


  /**
   * 转为json
   * @param space
   */
  public toJSON(space: number = 0): string {
    return HttpPathParam.toJSON(this);
  }

  /**
   * 转换为对象结构
   */
  public toJSONObject<T extends object>(): JSONObject<T> {
    const jsonObject = new JSONObject<T>();
    this.forEach((v, k) => {
      jsonObject.setField(k, v);
    })
    return jsonObject;
  }

  /**
   * 创建
   * @param value
   */
  static create<T extends object>(value: T) {
    return new HttpPathParam<T>(value);
  }

  /**
   * 转换为json
   * @param httpPathParam
   * @param space
   */
  static toJSON<T extends object>(httpPathParam: HttpPathParam<T>, space: number = 0): string {
    return httpPathParam.toJSONObject().stringify(space);
  }
}

export interface HttpPathParamConstructor {
  new <T extends object>(value: T): HttpPathParam<T>;
  create<T extends object>(value: T): HttpPathParam<T>;
}