import {JSONObject} from "./JSONObject";

export class ObjectedMap<T extends object> extends Map {

  public set<K extends keyof T, V extends T[K]>(key: K, value: V) {
    return super.set(key, value);
  }

  public get<K extends keyof T>(key: K): T[K] {
    return super.get(key);
  }

  public toJSON(): string {
    return this.toJSONObject().stringify();
  }

  public toJSONObject(): JSONObject<T> {
    return ObjectedMap.toJSONObject<T, ObjectedMap<T>>(this);
  }

  static toJSONObject<T extends object, O extends ObjectedMap<T>>(objectedMap: O): JSONObject<T> {
      const jsonObject = new JSONObject<T>();
      objectedMap.forEach((value, key) => {
        jsonObject.setField(key, value);
      });
      return jsonObject;
  }
}