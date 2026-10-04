import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../components/useDocumentTitle.js'

export default function NotFound() {
  useDocumentTitle('Not found')
  return (
    <Result
      status="404"
      title="Page not found"
      subTitle="This page does not exist, or it has moved. Try the menu on the left."
      extra={
        <Link to="/">
          <Button type="primary">Back to About</Button>
        </Link>
      }
    />
  )
}
