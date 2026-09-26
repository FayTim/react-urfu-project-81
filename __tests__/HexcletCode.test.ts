import { describe, expect, test } from 'vitest'
import HexletCode from '@hexlet/code';
import { readFixture } from '../__tests__/helpers/readFixture';
import { FormBuilder } from "../src";


const template = { name: 'rob', job: 'hexlet', gender: 'm' };

describe('check formFor', () => {
    test('empty form', () => {
        expect(HexletCode.formFor(template, {})).toEqual(readFixture('formEmpty.html'));
    })
    test('form with url', () => {
        expect(HexletCode.formFor(template, {url: '/users'}, () => {
        })).toEqual(readFixture(('formWithUrl.html')));
    })
    test('form with input as textarea', () => {
        expect(HexletCode.formFor(template, { method: 'post' }, (f : FormBuilder) => {
            f.input('name');
            f.input('job', { as: 'textarea' });
        })).toEqual(readFixture('formWithInputAsTextarea.html'));
    })
    test('form with input class', () => {
        expect(HexletCode.formFor(template, { method: 'post' }, (f : FormBuilder) => {
            f.input('name', { class: 'user-input'});
            f.input('job');
        })).toEqual(readFixture('formWithInputClass.html'));
    })
    test('form with textarea options', () => {
        expect(HexletCode.formFor(template, { method: 'post' }, (f : FormBuilder ) => {
            f.input('job', { as: 'textarea', rows: 50, cols: 50});
        })).toEqual(readFixture('formWithTextareaOptions.html'));
    })
    test('form without template field', () => {
        expect(() => HexletCode.formFor(template, { url: '/users' }, (f : FormBuilder) => {
            f.input('name');
            f.input('job', { as: 'textarea' });
            f.input('age');
        })).toThrow(`Field 'age' does not exist in the template.`);
    })
    test('renders label with custom text', () => {
        const result = HexletCode.formFor(template, {}, (f : FormBuilder) => {
            f.input('name', { label: 'User' });
        });

        expect(result).toEqual(readFixture('formWithCustomLabelText.html'));
    });

    test('renders label with custom html attributes', () => {
        const result = HexletCode.formFor(template, {}, (f : FormBuilder) => {
            f.input('name', { labelHtml: { class: 'form-label', id: 'name-label' } });
        });

        expect(result).toEqual(readFixture('formWithCustomLabelHtml.html'));
    });

    test('renders label with both custom text and html attributes', () => {
        const result = HexletCode.formFor(template, {}, (f : FormBuilder) => {
            f.input('name', { label: 'User', labelHtml: { class: 'form-label', id: 'name-label' } });
        });

        expect(result).toEqual(readFixture('formWithCustomLabelFull.html'));
    });
})

describe('submit', () => {
    test('submit empty', () => {
        expect(HexletCode.formFor(template, { method: 'post' }, (f : FormBuilder) => {
            f.input('name');
            f.input('job');
            f.submit();
        })).toEqual(readFixture('formSubmitEmpty.html'));
    })
    test('submit with name', () => {
        expect(HexletCode.formFor(template, { method: 'post' }, (f : FormBuilder) => {
            f.input('name');
            f.input('job');
            f.submit('Wow');
        })).toEqual(readFixture('formSubmitWithName.html'));
    })
    test('submit uses default value when not provided', () => {
        const result = HexletCode.formFor(template, {}, (f : FormBuilder) => {
            f.submit();
        });

        expect(result).toEqual(readFixture('formWithDefaultSubmit.html'));
    });
})
