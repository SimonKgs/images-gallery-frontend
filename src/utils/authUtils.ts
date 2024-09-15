interface loginProps {
    email: string,
    password: string,
}

const authUrl = 'http://localhost:5000/auth'

export const loginAction = async ({ email, password }: loginProps) => {
    const loginUrl = `${authUrl}/login`;

    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

  
      if (!response.ok) {
        const errorText = await response.text(); // Read the error response
        throw new Error(`Response status: ${response.status}. Message: ${errorText}`);
      }
  
      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('id', data.id);
      return data;
  
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };