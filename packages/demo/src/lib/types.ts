type tag = {
  id: string,
  name: string
}

type Demo = {
  id: string,
  code?: number,
  name: string,
  path: string,
  tags?: Array<tag>
}

type DemoList = Array<Demo>;

export {
  tag,
  Demo,
  DemoList
};