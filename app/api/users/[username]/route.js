import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({
        cookies: () => cookieStore
    });
    const username = params.username;
    const { data, error } = await supabase
        .from('users')
        .select().eq('username', username);
    console.log(error);
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data[0]);
}
