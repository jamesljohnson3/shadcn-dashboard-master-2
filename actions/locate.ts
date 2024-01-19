export async function getIpGeolocation({ip}) {
  try {
    const response = await fetch(`https://api.ip2location.io/?key=2AB0410E3D2DC3AD167C13D08309F394&ip=${ip}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch IP geolocation data: ${response.statusText}`);
    }

    // Parse the response JSON
    const data = await response.json();

    // Process the data as needed
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Re-throw the error to handle it in the calling code
  }
}
