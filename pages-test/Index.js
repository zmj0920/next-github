import { useEffect } from 'react'
import axios from 'axios'
import Head from 'next/head'
import { connect } from 'react-redux'
import { ADD, UPDATE_USERNAME } from '../store/actionTypes'

import getCofnig from 'next/config'
const { publicRuntimeConfig } = getCofnig()

const Index = ({ counter, username, add, rename }) => {

  useEffect(() => {
    axios.get('/api/user/info').then(res => {
      console.log(res)
    })
  },[])


  return (
    <>
      <Head>
        <title>首页</title>
      </Head>
      <div>
        <div>Count:{counter}</div>
        <div>UserName:{username}</div>
        <input value={username} onChange={(e) => rename(e.target.value)} />
        <button onClick={() => add(counter)}>渣渣新</button>
        <a href={publicRuntimeConfig.OAUTH_URL}> 登录</a>
      </div>
    </>
  )


}



export default connect(function mapStateToProps(state) {
  return {
    counter: state.counter.count,
    username: state.user.username
  }
}, function mapDispatchToProps(dispatch) {
  return {
    add: (num) => dispatch({ type: ADD, num }),
    rename: (name) => dispatch({ type: UPDATE_USERNAME, name })
  }
})(Index)
