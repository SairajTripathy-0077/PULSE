export const searchTracks = async (query) => {
    if (!query) {
        return [];
    }

    try {
        // Search iTunes API for songs. No auth required. Direct mp4 previews.
        const response = await fetch(
            `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=15`
        );

        if (!response.ok) {
            throw new Error(`iTunes API Error: ${response.status}`);
        }

        const data = await response.json();

        // Map to our standard song format
        return data.results
            .filter(item => item.previewUrl && typeof item.previewUrl === 'string') // Must have playable audio
            .map(item => ({
                id: item.trackId.toString(),
                title: item.trackName,
                artist: item.artistName,
                // Request a higher res version of the artwork (600x600 instead of default 100x100)
                albumArtUrl: item.artworkUrl100 ? item.artworkUrl100.replace('100x100', '600x600') : '',
                audioUrl: item.previewUrl, // Direct audio stream url (.m4a usually)
                duration: item.trackTimeMillis ? Math.floor(item.trackTimeMillis / 1000) : 30, // Fallback to 30s preview
            }));
    } catch (error) {
        console.error("Error fetching from iTunes API:", error);
        return [];
    }
};
