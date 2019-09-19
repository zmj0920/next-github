import { withRouter } from 'next/router'

function Search({ router }) {
    return (
        <span>Search{router.query.query}</span>
    )
}

export default withRouter(Search)