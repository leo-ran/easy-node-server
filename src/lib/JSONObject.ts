interface JSONObjectConstructor {
   new <T extends object> (): JSONObject<T>;
}
export const JSONObject: JSONObjectConstructor = class {
   setField(key: string | symbol, value: any): this {
      // @ts-ignore
      this[key] = value;
      return this;
   }
   getField(key: string): any {
      // @ts-ignore
      return this[key];
   }
   stringify(space: number = 0, replacer?: (this: any, key: string, value: any) => any): string {
      const {setField, getField, stringify, ...more} = this;
     return JSON.stringify(more, replacer, space);
   }
} as any;
export type JSONObject<T extends object> = Partial<T> & {
   setField: <K extends keyof T>(key: K, value: T[K]) => T;
   getField: <K extends keyof T>(key: K) => T[K];
   stringify(space?: number, replacer?: (this: any, key: string, value: any) => any): string;
};

