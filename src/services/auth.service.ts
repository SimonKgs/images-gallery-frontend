interface loginProps {
    email: string,
    password: string,
}

const authUrl = 'http://localhost:5000/auth'

// LOGIN
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
      localStorage.setItem('user', data.username)

      return data;
  
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
};

interface RegisterProps {
  username: string;
  email: string,
  password: string,
}

// * REGISTER
export const RegisterAction = async ({username, email, password }: RegisterProps) => {
  const registerUrl = `${authUrl}/register`;

  try {
    const response = await fetch(registerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, email, password }),
    });


    if (!response.ok) {
      const errorText = await response.text(); // Read the error response
      throw new Error(`Response status: ${response.status}. Message: ${errorText}`);
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('id', data.id);
    localStorage.setItem('user', data.username)
    return data;

  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

