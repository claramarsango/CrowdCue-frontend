export const createSession = async (sessionInfo: FormData) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}api/v1/sessions/create`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('Bearer')}`,
      },
      body: sessionInfo,
    },
  );

  return response;
};

export const getAllSessions = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}api/v1/sessions/explore`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('Bearer')}`,
      },
    },
  );

  return response;
};

export const getSessionById = async (id: string) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}api/v1/sessions/${id}`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('Bearer')}`,
      },
    },
  );

  return response;
};
