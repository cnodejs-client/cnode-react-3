/*
 * @Author: hejp
 * @Date:   11:21
 * @Last Modified by:   hejp
 * @Last Modified time: 11:21
 */
import React, {
    useEffect,
    useCallback
} from 'react'
import {connect} from 'react-redux';
import {
    getAllTopics,
    getTopicsParams
} from '../../store/actions/topics'
// 头部
import Header from '../../components/header'
// 列表
import TopicsList from './TopicsList'
// 是否可滚动加载
import useScollLoad from '../../hook/useScollLoad'
import PropTypes from 'prop-types'
// 列表骨架屏
import SkeletonList from '../../skeleton/List'
import './index.scss'

const Home = ({ topics, getAllTopics, flag, getTopicsParams, params, ...rest }) => {

    const isScrollLoad = useScollLoad();

    useEffect(() => {
        if (isScrollLoad && flag) {
            getTopicsParams({
                ...params,
                page: params.page + 1
            })
        }
    }, [isScrollLoad])

    useEffect(() => {
        if (params.page === 1) {
            window.scrollTo(0, 0)
        }
        console.log(isScrollLoad, !topics.length, 'isScrollLoad, !topics.length')
        if (isScrollLoad || params.page === 1) {
            getAllTopics(params)
        }
    }, [params])

    const tabChangeHandler = useCallback((value) => {
        getTopicsParams({
            ...params,
            page: 1,
            tab: value
        })
    }, [params])

    return (
        <>
            <Header tabChangeHandler={tabChangeHandler} tab={params.tab}></Header>
            {
                topics.length ?
                    <TopicsList topics={topics}></TopicsList> :
                    <SkeletonList style={{
                        padding: '55px 15px 0 15px'
                    }} />
            }
        </>
    )
}

Home.propTypes = {
    topics: PropTypes.array.isRequired,
    getAllTopics: PropTypes.func.isRequired,
    flag: PropTypes.bool.isRequired,
    getTopicsParams: PropTypes.func.isRequired,
    params: PropTypes.shape({
        page: PropTypes.number.isRequired,
        tab: PropTypes.string.isRequired,
        limit: PropTypes.number.isRequired
    }).isRequired
}

const topics = state => ({
    topics: state.topics.datas,
    flag: state.topics.flag,
    params: state.topics.params
})

export default connect(
    topics,
    {
        getAllTopics,
        getTopicsParams
    }
)(Home)
