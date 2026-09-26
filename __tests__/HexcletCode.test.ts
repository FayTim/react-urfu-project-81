import { describe, expect, test } from 'vitest'
import HexletCode from '@hexlet/code';
import { readFixture } from '../__tests__/helpers/readFixture';
import Tag from "../src/Tag";


const template = { name: 'rob', job: 'hexlet', gender: 'm' };

test('check hexletcode from', () => {
    expect(new Tag("br").toString()).toEqual("<br>");
    expect(new Tag("hr").toString()).toEqual("<hr>");
    expect(new Tag("img", { src: "path/to/image" }).toString()).toEqual(`<img src="path/to/image">`);
    expect(new Tag("input", { type: "submit", value: "Save" }).toString()).toEqual(`<input type="submit" value="Save">`);
})

describe('check formFor', () => {
    test('empty form', () => {
        expect(HexletCode.formFor(template, {}, (f) => {
        })).toEqual(readFixture('formEmpty.html'));
    })
    test('form with url', () => {
        expect(HexletCode.formFor(template, {url: '/users'}, (f) => {
        })).toEqual(readFixture(('formWithUrl.html')));
    })
    test('form with input as textarea', () => {
        expect(HexletCode.formFor(template, { method: 'post' }, (f) => {
            f.input('name');
            f.input('job', { as: 'textarea' });
        })).toEqual(readFixture('formWithInputAsTextarea.html'));
    })
    test('form with input class', () => {
        expect(HexletCode.formFor(template, { method: 'post' }, (f) => {
            f.input('name', { class: 'user-input'});
            f.input('job');
        })).toEqual(readFixture('formWithInputClass.html'));
    })
    test('form with textarea options', () => {
        expect(HexletCode.formFor(template, { method: 'post' }, (f ) => {
            f.input('job', { as: 'textarea', rows: 50, cols: 50});
        })).toEqual(readFixture('formWithTextareaOptions.html'));
    })
    test('form without template field', () => {
        expect(() => HexletCode.formFor(template, { url: '/users' }, (f) => {
            f.input('name');
            f.input('job', { as: 'textarea' });
            f.input('age');
        })).toThrow(`Field 'age' does not exist in the template.`);
    })
})

describe('submit', () => {
    test('submit empty', () => {
        expect(HexletCode.formFor(template, { method: 'post' }, (f) => {
            f.input('name');
            f.input('job');
            f.submit();
        })).toEqual(readFixture('formSubmitEmpty.html'));
    })
    test('submit with name', () => {
        expect(HexletCode.formFor(template, { method: 'post' }, (f) => {
            f.input('name');
            f.input('job');
            f.submit('Wow');
        })).toEqual(readFixture('formSubmitWithName.html'));
    })
})
