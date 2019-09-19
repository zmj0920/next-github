const Detail = () =>{
    return (
        <div>Detail</div>
    )
}

Detail.getInitialProps = () =>{
    return new Promise((resolve) =>{
        setTimeout(() =>{
            resolve({})
        },1000)
    })
}

export default Detail