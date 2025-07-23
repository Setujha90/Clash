import { CLASH_URL } from "@/lib/apiEndPoints";

export async function fetchClashs(token: string) {
    try {
        // Debug logging
        console.log('Token received:', token ? 'Token exists' : 'No token');
        console.log('Token length:', token?.length);
        
        if (!token) {
            throw new Error('No authentication token provided');
        }

        // Ensure the token has the Bearer prefix
        const authToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
        
        const res = await fetch(CLASH_URL, {
            headers: {
                Authorization: authToken,
            },
            next: {
                revalidate: 60 * 60,
                tags: ["dashboard"],
            },
        });

        if (!res.ok) {
            // Log more details about the error
            console.error(`Fetch failed with status: ${res.status} ${res.statusText}`);
            console.error(`URL: ${CLASH_URL}`);
            console.error(`Auth header sent:`, authToken.substring(0, 25) + '...');
            
            // Try to get the error response body
            const errorText = await res.text();
            console.error(`Error response:`, errorText);
            
            throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
        }
        
        const response = await res.json();
        if (response?.data) {
            return response?.data;
        }
        return [];
    } catch (error) {
        console.error('Error in fetchClashs:', error);
        throw error;
    }
}

export async function fetchClash(id: number, token: string) {
    try {
        if (!token) {
            throw new Error('No authentication token provided');
        }

        // Ensure the token has the Bearer prefix
        const authToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
        
        const res = await fetch(`${CLASH_URL}/${id}`, {
            headers: {
                Authorization: authToken,
            },
            next: {
                revalidate: 60 * 60,
                tags: ["dashboard"],
            },
        });

        if (!res.ok) {
            console.error(`Fetch failed with status: ${res.status} ${res.statusText}`);
            console.error(`URL: ${CLASH_URL}/${id}`);
            console.error(`Auth header sent:`, authToken.substring(0, 25) + '...');
            
            const errorText = await res.text();
            console.error(`Error response:`, errorText);
            
            throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
        }
        
        const response = await res.json();
        if (response?.data) {
            return response?.data;
        }
        return null;
    } catch (error) {
        console.error('Error in fetchClash:', error);
        throw error;
    }
}