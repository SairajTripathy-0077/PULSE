import fastify from 'fastify';
import cors from '@fastify/cors';
import ytdl from '@distube/ytdl-core';

const server = fastify();

// Allow frontend to request streams
server.register(cors, {
    origin: true
});

server.get('/stream', async (request, reply) => {
    const { videoId } = request.query;

    if (!videoId) {
        return reply.status(400).send({ error: 'Missing videoId' });
    }

    try {
        const url = `https://www.youtube.com/watch?v=${videoId}`;

        // Get audio format
        const info = await ytdl.getInfo(url);
        const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');

        if (audioFormats.length === 0) {
            return reply.status(404).send({ error: 'No audio format found' });
        }

        // Set standard audio streaming headers
        reply.header('Content-Type', 'audio/webm');
        reply.header('Transfer-Encoding', 'chunked');

        // Pipe the audio stream directly to the response
        const stream = ytdl(url, { filter: 'audioonly', highWaterMark: 1 << 25 });
        return reply.send(stream);

    } catch (error) {
        console.error('Streaming error:', error);
        reply.status(500).send({ error: 'Streaming failed' });
    }
});

const start = async () => {
    try {
        await server.listen({ port: 5177 });
        console.log(`Audio Proxy Server running at http://localhost:5177`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start();
