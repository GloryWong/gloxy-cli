type DemoTag = {
  id: string,
  name: string
}

type Demo = {
  name: string,
  code?: number,
  tags?: Array<DemoTag>
}

type DemoList = Array<Demo>;

export {
  DemoTag,
  Demo,
  DemoList
};