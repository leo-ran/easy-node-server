import {describe, it} from "mocha";
import {assert} from "chai";
import {JSONObject} from "./JSONObject";

describe("JSONObject.spec.ts", () => {
  const jsonObject = new JSONObject<{name: string}>();


  it('JSONObject setField should is function', function () {
    assert.isFunction(jsonObject.setField)
  });

  it('JSONObject getField should is function', function () {
    assert.isFunction(jsonObject.getField)
  });

  it('JSONObject field `name` should is string', function () {
    jsonObject.setField("name", "1");
    assert.isString(jsonObject.name);
  });
});