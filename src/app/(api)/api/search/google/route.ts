import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const baseUrl = 'https://www.googleapis.com/customsearch/v1';
const apiKey = `${process.env.NEXT_PUBLIC_SEARCH_ENGINE_API_KEY}`;
const cx = `${process.env.NEXT_PUBLIC_SEARCH_ENGINE_CONTEXT}`;

export async function POST(req: NextRequest){
    const body = await req.json()
    const { query } = body
    const fullUrl = new URL(baseUrl);
    fullUrl.searchParams.append('key', apiKey);
    fullUrl.searchParams.append('cx', cx);
    fullUrl.searchParams.append('q', query.split(" ").join("%20"));

    const searchResults = await axios.get(fullUrl.toString())

    return NextResponse.json({ data: searchResults.data.items })
}