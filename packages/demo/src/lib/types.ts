type DemoTag = {
  id: string,
  name: string
}

type Demo = {
  id: string,
  name: string,
  tags?: Array<DemoTag>
}

type DemoIndexItem = { id: string, name: string, code: number, tags?: DemoTag };
type DemoIndex = Array<DemoIndexItem>;

export {
  DemoTag,
  Demo,
  DemoIndexItem,
  DemoIndex
};