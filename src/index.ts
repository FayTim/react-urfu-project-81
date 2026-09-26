type FormOptions = {
  url?: string;
  method?: string;
};

type BuilderOptions = {
  as?: "text" | "textarea";
  class?: string;
  rows?: number;
  cols?: number;
};

export type FormBuilder = {
  input: (name: string, options?: BuilderOptions) => void;
  submit: (value?: string) => void;
};

const formFor = (
  data: Record<string, unknown>,
  options: FormOptions,
  build: (f: FormBuilder) => void = () => {},
): string => {
  const action = options.url ?? "#";
  const method = options.method ?? "post";
  const fields: string[] = [];

  const builder: FormBuilder = {
    input: (name, opts = {}) => {
      const value = data[name];
      if (value === undefined) {
        throw new Error(`Field '${name}' does not exist in the template.`);
      }
      fields.push(`<label for="${name}">${capitalize(name)}</label>`);
      if (opts.as === "textarea") {
        fields.push(
          `<textarea cols="${opts.cols ?? 20}" rows="${opts.rows ?? 40}" name="${name}">${value}</textarea>`,
        );
      } else {
        fields.push(
          `<input name="${name}" type="text" value="${value}"${opts.class === undefined ? "" : ` class="${opts.class}"`}>`,
        );
      }
    },
    submit: (value = "Save") => {
      fields.push(`<input type="submit" value="${value}">`);
    },
  };
  build(builder);

  const inner = fields.length === 0 ? "" : `${fields.join("")}`;

  return `<form method="${method}" action="${action}">${inner}</form>`;
};

const capitalize = ([first, ...rest]: string): string => {
  return first ? first.toUpperCase() + rest.join("") : "";
};

export default { formFor };
