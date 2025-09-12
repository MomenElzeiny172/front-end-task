'use client';

import Link from 'next/link';

export default function BackButton({
    parentId,
    parentName
}: {
    parentId: string | null;
    parentName: string | null;
    }) {
    if (!parentId || !parentName) return null;

    const href = parentId === 'root' ? '/' : `/folder/${parentId}`;

    return (
        <Link
            href={href}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
            <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                />
            </svg>
            Back to {parentName}
        </Link>
    );
}