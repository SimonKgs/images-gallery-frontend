const baseUrl = 'http://localhost:5000'


export const getUserImages = async() => {

    const userId = localStorage.getItem('id');
    const token = localStorage.getItem('token')


    if (!userId || !token ) return

    const getImagesUrl = `${baseUrl}/images/user/${userId}`


    try {
        const response = await fetch(getImagesUrl, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });
  
    
        if (!response.ok) {
          const errorText = await response.text(); // Read the error response
          throw new Error(`Response status: ${response.status}. Message: ${errorText}`);
        }
    
        const { images } = await response.json();
                
        return images;
    
      } catch ( error ) {
        console.error("There was an error loading the images");
      }
}


export const editImage = async(imgId: string, newTitle: string) => {

    const userId = localStorage.getItem('id');
    const token = localStorage.getItem('token')
    
    if (!userId || !token || !imgId ) return

    if (newTitle.length < 3 || newTitle.length > 20) return

    const getImagesUrl = `${baseUrl}/images/user/${userId}/${imgId}`
    
    try {
        const response = await fetch(getImagesUrl, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: newTitle })
        });
  
    
        if (!response.ok) {
          const errorText = await response.text(); // Read the error response
          throw new Error(`Response status: ${response.status}. Message: ${errorText}`);
        }
    
        const data = await response.json();
        
        return data;
    
      } catch ( error ) {
        console.error("There was an error editing the image");
      }
}


export const deleteImage = async(imgId: string) => {

    const userId = localStorage.getItem('id');
    const token = localStorage.getItem('token')
    
    if (!userId || !token || !imgId ) return

    const getImagesUrl = `${baseUrl}/images/user/${userId}/${imgId}`

    try {
        const response = await fetch(getImagesUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
  
    
        if (!response.ok) {
          const errorText = await response.text(); // Read the error response
          throw new Error(`Response status: ${response.status}. Message: ${errorText}`);
        }
    
        const data = await response.json();

        return data;
    
      } catch ( error ) {
        console.error("There was an error deleting the image");
      }
}