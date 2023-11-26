// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import { act } from '@testing-library/react'
import { configMocks, mockIntersectionObserver } from 'jsdom-testing-mocks'

configMocks({ act })

mockIntersectionObserver()
