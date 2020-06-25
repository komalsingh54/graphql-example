import axios from 'axios';

const endoPointUrl = 'http://localhost:9000/graphql';

export const graphQLRequest = async (query, variables = {}, operationName = '') => {
  try {
    const res = await axios.post(endoPointUrl, {
      query,
      variables,
      operationName,
    });
    return res.data.data;
  } catch (error) {

  }
}

export const loadJobs = async () => {
  const query = `
        {
          jobs {
            title
            id
            company{
              name
            }
          }
        }              
        `
  const response = await graphQLRequest(query);
  return response;
}

export const getJob = async (jobId) => {
  const query = `
    query JobQuery($id: ID!) {
      job(id: $id) {
        id
        title
        description
        company {
          name
          id
          description
        }
      }
    }               
    `;
  const response = await graphQLRequest(query, { id: jobId }, 'JobQuery')
  return response;
}

export const getCompanyDetail = async (companyId) => {
  const query = `
  query CompanyQuery($id: ID!) {
    company(id: $id) {
      id
      name
      description
    }
  }         
`;
  return await graphQLRequest(query, { id: companyId }, 'CompanyQuery')
}