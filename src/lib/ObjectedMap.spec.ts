import {describe, it} from "mocha";
import {assert} from "chai";
import {ObjectedMap} from "./ObjectedMap";

describe("ObjectedMap.spec.ts", () => {
  const objectedMap = new ObjectedMap<{name: string, age: number}>();
  objectedMap.set("name", "sam");
  objectedMap.set("age", 1);

  it('objectedMap.toJSON should is function', function () {
    assert.isFunction(objectedMap.toJSON);
  });

  it('objectedMap.toJSONObject should is function', function () {
    assert.isFunction(objectedMap.toJSONObject);
  });

  it('objectedMap.toJSON() should in string', function () {
    assert.isString(objectedMap.toJSON());
  });

});