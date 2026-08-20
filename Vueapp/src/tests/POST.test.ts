import { mount } from '@vue/test-utils'
import POST from '@/components/components/POST.vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('POST.vue', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('renders input fields and a save button', () => {
    const wrapper = mount(POST)
    expect(wrapper.find('input[placeholder="Song Title"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="Artist Name"]').exists()).toBe(true)
    expect(wrapper.find('button').text()).toContain('Save')
  })

  it('saves a song when form is submitted', async () => {
    const mockResponse = {
      id: 1,
      title: 'Test Song',
      artist: 'Test Artist'
    }

    // mock fetch
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    })

    const wrapper = mount(POST)

    // Fill form
    await wrapper.find('input[placeholder="Song Title"]').setValue('Test Song')
    await wrapper.find('input[placeholder="Artist Name"]').setValue('Test Artist')

    // Submit
    await wrapper.find('button').trigger('click')

    // Wait for DOM update
    await wrapper.vm.$nextTick()

    // Message should be visible
    expect(wrapper.text()).toContain('✅ Song saved!')
  })
})
