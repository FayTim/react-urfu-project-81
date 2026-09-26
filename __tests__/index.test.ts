import { expect, test } from 'vitest'
import Tag from "../src/Tag.js";

test('check single tag', () : void => {
    expect(new Tag("br").toString()).toEqual("<br>");
    expect(new Tag("hr").toString()).toEqual("<hr>");
    expect(new Tag("img", { src: "path/to/image" }).toString()).toEqual(`<img src="path/to/image">`);
    expect(new Tag("input", { type: "submit", value: "Save" }).toString()).toEqual(`<input type="submit" value="Save">`);
})