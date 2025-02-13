import { Heap, MaxHeap, MinHeap } from '../src/index'

test('min heap', () => {
  const heap = new MinHeap()
  heap.insert(1)
  heap.insert(2)
  heap.insert(3)

  expect(heap.extract()).toEqual(1)
  expect(heap.extract()).toEqual(2)
  expect(heap.extract()).toEqual(3)
})

test('max heap', () => {
  const heap = new MaxHeap()
  heap.insert(1)
  heap.insert(2)
  heap.insert(3)

  expect(heap.extract()).toEqual(3)
  expect(heap.extract()).toEqual(2)
  expect(heap.extract()).toEqual(1)
})

test('custom comparator', () => {
  const comparator = (a: { priority: number }, b: { priority: number }) =>
    a.priority < b.priority

  const heap = new Heap(comparator)
  heap.insert({ priority: 1 })
  heap.insert({ priority: 2 })
  heap.insert({ priority: 3 })

  expect(heap.extract()).toEqual({ priority: 1 })
  expect(heap.extract()).toEqual({ priority: 2 })
  expect(heap.extract()).toEqual({ priority: 3 })
})

test('clear', () => {
  const heap = new MinHeap()
  heap.insert(1)
  heap.insert(2)
  heap.insert(3)

  expect(heap.size).toEqual(3)
  heap.clear()
  expect(heap.size).toEqual(0)
})

test('insertMany', () => {
  const heap = new MinHeap()
  heap.insertMany([1, 2, 3])
  expect(heap.peek()).toEqual(1)
  expect(heap.size).toEqual(3)
})

test('peek', () => {
  const heap = new MinHeap()
  heap.insert(1)
  heap.insert(2)
  heap.insert(3)

  expect(heap.peek()).toEqual(1)
})

test('size', () => {
  const heap = new MinHeap()
  heap.insert(1)
  expect(heap.size).toEqual(1)
  heap.insert(2)
  expect(heap.size).toEqual(2)
  heap.insert(3)
  expect(heap.size).toEqual(3)
})
