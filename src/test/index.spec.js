import { shallowMount } from '@vue/test-utils';
import Index from '../components/index.vue';

describe('Index', () => {
  it('index 组件单元测试', () => {
    const wrapper = shallowMount(Index, {
      data() {
        return {
          name: '王富贵',
        }
      }
    })

    // 确认是否渲染了 `name`
    expect(wrapper.find('.index-wrapper input.username').value()).toEqual('王富贵');

    // 更新 `name` 并断言错误信息不再被渲染
    wrapper.setData({ name: '狐狸嘎嘎' })
    expect(wrapper.find('.index-wrapper input.username').value()).toEqual('狐狸嘎嘎');
  })
});