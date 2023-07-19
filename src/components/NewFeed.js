import { useEffect, useState } from "react";
import { pageablePostList } from "../services/postSvc";
import { toast } from "react-toastify";
import {
  Col,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap";
import Post from "./Post";

const NewFeed = () => {
  const [postContent, setPostContent] = useState({
    posts: [],
    totalPages: "",
    totalElements: "",
    pageSize: 0,
    pageNumber: 0,
    lastPage: false,
  });

  useEffect(() => {
    changePage();
  }, []);

  const changePage = (pageNumber = 0, pageSize = 10) => {
    pageablePostList(pageNumber, pageSize)
      .then((response) => {
        if (response.status === "OK") {
          setPostContent({
            ...postContent,
            posts: response?.data?.posts?.content,
            totalPages: response?.data?.posts?.totalPages,
            totalElements: response?.data?.posts?.totalElements,
            pageSize: response?.data?.posts?.pageable?.pageSize,
            pageNumber: response?.data.posts.pageable.pageNumber,
            lastPage: response?.data?.posts?.last,
          });
          window.scroll(0,0)
        } else {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="container-fluid">
      <Row>
        <Col
          md={{
            size: 10,
            offset: 1,
          }}
        >
          <h1>Blogs Count ({postContent.totalElements})</h1>
          {postContent.posts.map((post) => (
            <Post post={post} key={post.id} />
          ))}

          <Container className="text-center mt-5">
            <Pagination size="lg">
              <PaginationItem
                onClick={() => {
                  changePage(0);
                }}
                disabled={postContent.pageNumber == 0}
              >
                <PaginationLink first>First</PaginationLink>
              </PaginationItem>
              <PaginationItem
                onClick={() => {
                  changePage(postContent.pageNumber - 1);
                }}
                disabled={postContent.pageNumber == 0}
              >
                <PaginationLink previous>Previous</PaginationLink>
              </PaginationItem>

              {[...Array(postContent.totalPages)].map((item, index) => (
                <PaginationItem
                  onClick={() => changePage(index)}
                  active={postContent.pageNumber == index}
                  key={index}
                >
                  <PaginationLink>{index + 1}</PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem
                onClick={() => {
                  changePage(postContent.pageNumber + 1);
                }}
                disabled={postContent.lastPage}
              >
                <PaginationLink next>Next</PaginationLink>
              </PaginationItem>
              <PaginationItem
                onClick={() => {
                  changePage(postContent.totalPages - 1);
                }}
                disabled={postContent.lastPage}
              >
                <PaginationLink last>Last</PaginationLink>
              </PaginationItem>
            </Pagination>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default NewFeed;
