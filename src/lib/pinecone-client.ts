import { Pinecone } from '@pinecone-database/pinecone';
import { env } from './config';
import { delay } from './utils';

const pc = new Pinecone({
    apiKey: env.PINECONE_API_KEY
});

async function createIndex() {
    try {
        await pc.createIndex({
            name: env.PINECONE_INDEX_NAME,
            dimension: 1536,
            metric: 'cosine',
            spec: { 
                serverless: { 
                    cloud: 'gcp', 
                    region: 'us-west-4'
                }
            } 
        })
        console.log('Waiting for index to be created..')
        await delay(env.INDEX_INIT_TIMEOUT)
        console.log('Index created!')
    } catch (error) {
        console.error('ERROR:', error)
        throw new Error("Index creation failed")
    }

}