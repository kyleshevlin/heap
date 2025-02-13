# heap

Just a basic, customizable heap implementation in TypeScript

## Usage

```typescript
import { Heap, MinHeap, MaxHeap } from '@kyleshevlin/heap'

const min = new MinHeap()
const max = new MaxHeap()

type Task = {
  priority: number
}

const custom = new Heap<Task>((a, b) => a.priority < b.priority)
```

## API

- `constructor<T>(comparator: (a: T, b: T) => boolean)`
- `clear()`
- `insert(value: T)`
- `insertMany(values: T[])`
- `extract()`
- `peek()`
- `size`

## Tips

For min-heaps, your `comparator` should return `true` when `a < b`, and vice versa for max heaps.
