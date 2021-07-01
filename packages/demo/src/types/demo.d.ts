type DemoTag = {
  id: string,
  name: string
}

type Demo = {
  id: string,
  name: string,
  tags?: Array<DemoTag>
}