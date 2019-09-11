import Link from 'next/link'
import { Button } from 'antd';

export default ({ children }) => (
    <>
        <header>
            <Link href="/a?name=渣渣新"  >
                <Button>index</Button>
            </Link>
        </header>
        <div>
            {children}
        </div>
    </>
)
