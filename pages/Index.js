import Head from 'next/head'
import {connect} from 'react-redux'


const Index = ({counter,username,add,rename}) => {
  return (
    <>
      <Head>
        <title>首页</title>
      </Head>
      <div>
        <div>Count:{counter}</div>
        <div>UserName:{username}</div>
        <input  value={username} onChange={(e)=>rename(e.target.value)} />
        <button onClick={()=>add(counter)}>渣渣新</button>
      </div>
    </>
  )
}

export default connect(function mapStateToProps(state){
  return {
    counter:state.counter.count,
    username:state.user.username
  }
},function mapDispatchToProps(dispatch){
  return {
    add:(num)=>dispatch({type:'ADD',num}),
    rename:(name)=>dispatch({type:'UPDATE_USERNAME',name})
  }
})(Index)
