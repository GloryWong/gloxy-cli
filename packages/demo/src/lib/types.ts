type DemoTag = {
  id: string,
  name: string
}

type Demo = {
  id: string,
  name: string,
  tags?: Array<DemoTag>
}

type DemoIndex = Array<{ name: string, code: number, tags?: DemoTag}>;

export {
  DemoTag,
  Demo,
  DemoIndex
};