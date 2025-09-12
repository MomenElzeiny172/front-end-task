export default function FileIcon({ fileName }: { fileName: string }) {
    const extension = fileName.split('.').pop()?.toLowerCase() || '';

    if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].includes(extension)) {
        return (
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
        );
    }

    if (['mp4', 'avi', 'mov', 'mkv', 'webm'].includes(extension)) {
        return (
            <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
        );
    }

    if (extension === 'pdf') {
        return (
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-5L9 2H4z" clipRule="evenodd" />
                <text x="10" y="12" fontSize="6" textAnchor="middle" fill="white" fontWeight="bold">PDF</text>
            </svg>
        );
    }

    if (['doc', 'docx'].includes(extension)) {
        return (
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-5L9 2H4z" clipRule="evenodd" />
                <text x="10" y="12" fontSize="5" textAnchor="middle" fill="white" fontWeight="bold">DOC</text>
            </svg>
        );
    }

    if (['xls', 'xlsx', 'csv'].includes(extension)) {
        return (
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-5L9 2H4z" clipRule="evenodd" />
                <text x="10" y="12" fontSize="5" textAnchor="middle" fill="white" fontWeight="bold">XLS</text>
            </svg>
        );
    }

    if (['ppt', 'pptx'].includes(extension)) {
        return (
            <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-5L9 2H4z" clipRule="evenodd" />
                <text x="10" y="12" fontSize="5" textAnchor="middle" fill="white" fontWeight="bold">PPT</text>
            </svg>
        );
    }

    if (['txt', 'md', 'rtf'].includes(extension)) {
        return (
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
        );
    }

    if (['zip', 'rar', '7z', 'tar', 'gz'].includes(extension)) {
        return (
            <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a2 2 0 00-2 2v1H5a2 2 0 00-2 2v9a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2V4a2 2 0 00-2-2H9zm2 3V4H9v1h2zm-6 7v-2h10v2H5z" />
            </svg>
        );
    }

    if (['mp3', 'wav', 'ogg', 'flac', 'm4a'].includes(extension)) {
        return (
            <svg className="w-5 h-5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
            </svg>
        );
    }

    if (['js', 'ts', 'jsx', 'tsx', 'html', 'css', 'json', 'py', 'java', 'cpp'].includes(extension)) {
        return (
            <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
        );
    }

    return (
        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
        </svg>
    );
}