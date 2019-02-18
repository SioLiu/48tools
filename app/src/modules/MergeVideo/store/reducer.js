import { createAction, handleActions } from 'redux-actions';
import { fromJS, List } from 'immutable';

/* 使用immutable初始化基础数据 */
const initData: {
  mergeList: Immutable.List
} = {
  mergeList: List([])
};

/* Action */
export const mergeList: Function = createAction('合并视频列表'); // 剪切队列

/* reducer */
const reducer: Function = handleActions({
  [mergeList]: ($$state: Immutable.Map, action: Object): Immutable.Map => {
    return $$state.set('mergeList', List(action.payload.mergeList));
  }
}, fromJS(initData));

export default {
  mergeVideo: reducer
};