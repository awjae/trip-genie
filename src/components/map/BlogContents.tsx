import { MOCK_BLOG_DATA } from '@/assets/mock';
import { getSearchBlog } from '@/utils/searchAPI';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import useInputStore from '@/store/inputStore';

function BlogContents() {
  // const [blogData, setBlogData] = useState(MOCK_BLOG_DATA);
  const input = useInputStore((state: any) => state.input);
  const [blogData, setBlogData] = useState([]);
  useQuery("searchBlog", () => getSearchBlog(`${input.contry} ${input.destination} 맛집`), {
    onSuccess(data) {
      setBlogData(JSON.parse(data).items);
    },
  });

  return (
    <BlogContentsContainer>
      <h2>추천 맛집 블로그!</h2>
      <ul>
        {
          blogData.length > 0 && blogData.map((blog: any, idx) => (
            <li key={idx} onClick={() => window.open(blog.link)}>
              <span dangerouslySetInnerHTML={{ __html: blog.title}}></span>
            </li>
          ))
        }
      </ul>
    </BlogContentsContainer>
  )
}

export default BlogContents;

const BlogContentsContainer = styled.div`
  h2 {
    font-size: 18px;
  }
  ul {
    display: flex;
    flex-wrap: nowrap;
    margin: 15px 0px 0px;
    padding-bottom: 10px;
    overflow: auto;
    width: 100%;
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 15px;
      background-color: #bddab1;
      width: 105px;
      min-width: 105px;
      font-size: 14px;
      text-align: center;
      padding: 15px 5px;
      cursor: pointer;
      &:not(:last-of-type) {
        margin-right: 15px;
      }
      span {
        word-break: keep-all;
      }
    }
  }
`;