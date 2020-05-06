import {describe, it} from "mocha";
import {assert} from "chai";


import {HttpQueryParam} from "./HttpQueryParam";

const querystring: string = "name=sam&age=20";
const query = new HttpQueryParam<{name: string, age: string}>(querystring);

describe("HttpQueryParam.spec.ts", () => {
  it('HttpQueryParam.stringify should is function', function () {
    assert.isFunction(query.stringify);
  });

  it('HttpQueryParam.stringify should strictEqual querystring', function () {
    assert.strictEqual(query.stringify(), querystring);
  });

  it('get("name") should strictEqual sam', function () {
    assert.strictEqual(query.get("name"), "sam");
  });

  it('get("age") should strictEqual 20', function () {
    assert.strictEqual(query.get("age"), "20");
  });
});