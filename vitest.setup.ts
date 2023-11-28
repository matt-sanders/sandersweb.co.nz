import '@testing-library/jest-dom/vitest'
import { act, cleanup } from '@testing-library/react'
import { configMocks, mockIntersectionObserver } from 'jsdom-testing-mocks'
import { afterAll, afterEach } from 'vitest'

// mock browser APIs
configMocks({ act, afterAll })
mockIntersectionObserver()

afterEach(() => {
  cleanup()
})
