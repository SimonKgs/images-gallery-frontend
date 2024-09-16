
const baseUrl = 'http://localhost:5000'


export const getCurrentUser = async(): Promise<any> => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('id');

  if (!token || !userId) {
      throw new Error('No token or user ID found');
  }

  try {
      const response = await fetch(`${baseUrl}/user/${userId}`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
          throw new Error('Failed to fetch user data');
      }

      const user = await response.json();
      
      return user;
  } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
  }
}
