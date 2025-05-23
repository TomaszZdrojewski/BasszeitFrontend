import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Homepage from '../Homepage.vue'

describe('Homepage', () => {
  it('renders properly', () => {
    const wrapper = mount(Homepage, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
