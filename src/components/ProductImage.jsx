import { ImageIcon } from "lucide-react";
import { useState } from "react";

export default function ProductImage({ src, alt, className = "" }) {
    const [failedSource, setFailedSource] = useState("");

    if (!src || failedSource === src) {
        return (
            <span
                role="img"
                aria-label={`${alt || "Product"} image unavailable`}
                className={`flex items-center justify-center bg-muted text-muted-foreground ${className}`}
            >
                <ImageIcon className="h-5 w-5" aria-hidden="true" />
            </span>
        );
    }

    return (
        <img
            src={src}
            alt={alt || ""}
            loading="lazy"
            onError={() => setFailedSource(src)}
            className={className}
        />
    );
}
