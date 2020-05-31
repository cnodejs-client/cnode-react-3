/*
 * @Author: hejp
 * @Date:   16:17
 * @Last Modified by:   hejp
 * @Last Modified time: 16:17
 */
import * as types from '../actionType'
import Ajax from '../../service'

const details = data => ({
    type: types.DETAILS,
    data
})

const commentLike = payload => ({
    type: types.COMMENT_LIKE,
    payload
})


/**
 * 获取详情
 * @param {*} id 
 */
export const  getDetails = id => (dispatch, getState) => {
    if (JSON.stringify(getState().details) !== '{}') {
        dispatch(details({}))
    }
    Ajax.getDetails(id)
        .then(res => {
            dispatch(details(res.data))
        })
}

/**
 * 点赞或者取消点赞
 * @param {*} id 
 */
export const setOrCancelCommentLike = params => dispatch => {
    dispatch(commentLike(params))
}
