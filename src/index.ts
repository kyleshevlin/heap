type Comparator<T> = (a: T, b: T) => boolean

export class Heap<T> {
  #heap: T[]
  #compare: Comparator<T>

  constructor(comparator: Comparator<T>) {
    this.#heap = []
    this.#compare = comparator
  }

  toString() {
    const items = this.#heap.map(item => JSON.stringify(item, null, 2))
    return `Heap { size: ${this.size}, heap: [${items.join(', ')}] }`
  }

  [Symbol.for('nodejs.util.inspect.custom')]() {
    return this.toString()
  }

  #getParentIndex(index: number) {
    return Math.floor((index - 1) / 2)
  }

  #getLeftChildIndex(index: number) {
    return 2 * index + 1
  }

  #getRightChildIndex(index: number) {
    return 2 * index + 2
  }

  #bubbleUp(index: number) {
    let currentIndex = index
    let parentIndex = this.#getParentIndex(index)

    while (
      parentIndex >= 0 &&
      this.#compare(this.#heap[currentIndex], this.#heap[parentIndex])
    ) {
      this.#swap(currentIndex, parentIndex)

      currentIndex = parentIndex
      parentIndex = this.#getParentIndex(currentIndex)
    }
  }

  #bubbleDown(index: number) {
    let currentIndex = index

    while (true) {
      const leftChildIndex = this.#getLeftChildIndex(currentIndex)
      const rightChildIndex = this.#getRightChildIndex(currentIndex)
      let candidateIndex = currentIndex

      if (
        leftChildIndex < this.#heap.length &&
        this.#compare(this.#heap[leftChildIndex], this.#heap[candidateIndex])
      ) {
        candidateIndex = leftChildIndex
      }

      if (
        rightChildIndex < this.#heap.length &&
        this.#compare(this.#heap[rightChildIndex], this.#heap[candidateIndex])
      ) {
        candidateIndex = rightChildIndex
      }

      if (candidateIndex === currentIndex) break

      this.#swap(currentIndex, candidateIndex)

      currentIndex = candidateIndex
    }
  }

  #swap(index1: number, index2: number) {
    const temp = this.#heap[index1]
    this.#heap[index1] = this.#heap[index2]
    this.#heap[index2] = temp
  }

  clear() {
    this.#heap = []
  }

  insert(value: T) {
    this.#heap.push(value)
    this.#bubbleUp(this.#heap.length - 1)
  }

  insertMany(values: T[]) {
    values.forEach(value => this.insert(value))
  }

  extract() {
    if (this.#heap.length === 0) return null
    if (this.#heap.length === 1) return this.#heap.pop()

    const result = this.#heap[0]

    this.#heap[0] = this.#heap.pop()
    this.#bubbleDown(0)

    return result
  }

  peek() {
    return this.#heap[0]
  }

  get size() {
    return this.#heap.length
  }
}

export class MinHeap extends Heap<number> {
  constructor() {
    super((a, b) => a < b)
  }
}

export class MaxHeap extends Heap<number> {
  constructor() {
    super((a, b) => a > b)
  }
}
