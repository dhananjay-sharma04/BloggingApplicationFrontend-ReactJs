import { Button, Card, CardBody, CardText } from "reactstrap"

const Post = ({post={title:"",content:""}}) => {
  return (
    <Card className="mt-3">
        <CardBody className="border-0 shadow-sm mt-3">
            <h1>{post.title}</h1>
            <CardText dangerouslySetInnerHTML={{__html:post.content.substring(0, 50)+"....."}}>
            </CardText>
            <div>
                <Button>Read More</Button>
            </div>
        </CardBody>
    </Card>
  )
}

export default Post