import { NextRequest, NextResponse } from "next/server";
import { BACKEND_API_BASE_URL } from "@/lib/config/api";

// Use the backend API URL from environment variable
const API_BASE_URL = BACKEND_API_BASE_URL;

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    try {
        const { path: pathArray } = await params;
        const path = "/" + pathArray.join("/");

        const formData = await request.formData();

        const url = "http://206.162.244.175:6006/api/v1" + path;

        const authHeader = request.headers.get("authorization");
        const headers: HeadersInit = {};

        if (authHeader) {
            headers["Authorization"] = authHeader;
        }

        const response = await fetch(url, {
            method: "POST",
            headers,
            body: formData,
        });

        const data = await response.json();

        return NextResponse.json(data, {
            status: response.status,
        });
    } catch (error) {
        console.error("Proxy error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Proxy error",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    try {
        const { path: pathArray } = await params;
        const path = pathArray.join("/");
        const url = `${API_BASE_URL}/${path}`;

        const authHeader = request.headers.get("authorization");
        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };
        if (authHeader) {
            headers["Authorization"] = authHeader;
        }

        const response = await fetch(url, {
            method: "GET",
            headers,
        });

        const data = await response.json();

        return NextResponse.json(data, {
            status: response.status,
        });
    } catch (error) {
        console.error("Proxy error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Proxy error",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    try {
        const { path: pathArray } = await params;
        const path = "/" + pathArray.join("/");

        const formData = await request.formData();

        const url = "http://206.162.244.175:6006/api/v1" + path;

        const authHeader = request.headers.get("authorization");
        const headers: HeadersInit = {};

        if (authHeader) {
            headers["Authorization"] = authHeader;
        }

        const response = await fetch(url, {
            method: "PUT",
            headers,
            body: formData,
        });

        const data = await response.json();

        return NextResponse.json(data, {
            status: response.status,
        });
    } catch (error) {
        console.error("Proxy error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Proxy error",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    try {
        const { path: pathArray } = await params;
        const path = pathArray.join("/");
        const url = `${API_BASE_URL}/${path}`;

        // Get Authorization header from request if present
        const authHeader = request.headers.get("authorization");
        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };
        if (authHeader) {
            headers["Authorization"] = authHeader;
        }

        const response = await fetch(url, {
            method: "DELETE",
            headers,
        });

        const data = await response.json();

        return NextResponse.json(data, {
            status: response.status,
        });
    } catch (error) {
        console.error("Proxy error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Proxy error",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
