import { request, gql } from 'graphql-request'

export const getItems = async () => {
  const query = gql`
    query MyQuery {
      itemsConnection {
        edges {
          node {
            itemName
            category {
              categoryName
            }
            price
            id
            itemPhoto {
              url
            }
          }
        }
      }
    }
  `
  const result = await request('https://api-ap-northeast-1.graphcms.com/v2/cl1c2r8id2my501yvhg1ff5hh/master', query);
  return result.itemsConnection.edges
}

export const getCategories = async () => {
  const query = gql `
    query MyQuery {
      categoriesConnection {
        edges {
          node {
            categoryName
            id
          }
        }
      }
    }
  `
  const result = await request('https://api-ap-northeast-1.graphcms.com/v2/cl1c2r8id2my501yvhg1ff5hh/master', query);
  return result.categoriesConnection.edges
}