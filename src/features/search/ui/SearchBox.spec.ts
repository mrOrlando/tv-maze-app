import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SearchBox from './SearchBox.vue';

describe('SearchBox.vue', () => {
  it('renders search input and emits on submit', async () => {
    const wrapper = mount(SearchBox);
    const input = wrapper.find('input[data-test="search-input"]');
    expect(input.exists()).toBe(true);

    await input.setValue('Friends');
    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.emitted('change-search-box')).toBeTruthy();
    expect(wrapper.emitted('change-search-box')?.[0]).toEqual(['Friends']);
  });
});
