import { gql } from '@apollo/client';

/* 
* GraphQL queries used in the application.
* Includes the `GET_IMAGES` query to fetch images with pagination and optional filtering by title.
*/

export const GET_IMAGES = gql`
  query GetImages($first: Int, $after: String, $title: String) {
    images(first: $first, after: $after, title: $title) {
      edges {
        cursor
        node {
          id
          title
          author
          price
          likesCount
          liked
          picture
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;