import {describe, it} from "mocha";
import {assert} from "chai";
import {Etag} from "./Etag";
import * as path from "path";
import {File} from "./FileSystem/File";

describe("Etag.spec.ts", () => {
  const file = new File(path.resolve("Readme.md"));
  const etag = Etag.fromFile("/test", file, "strict");

  // console.log(Etag.parse(etag.stringify()));
});