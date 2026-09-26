class Tag {
  constructor(
    public name: string,
    public options?: object,
    public value?: string,
  ) {}
  toString() {
    return `<${this.name}${this.options === undefined ? "" : " " + this.buildOptions(this.options)}>`;
  }
  private buildOptions = (options : object): string => {
    const entries: [string, string][] = Object.entries(options);
    const tags = entries.map(([key, value]) => `${key}="${value}"`);
    return tags.join(" ");
  };
}

export default Tag;
