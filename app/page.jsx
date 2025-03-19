"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import LeftArrow from "./assets/left-arrow";
import RightArrow from "./assets/right-arrow";
import Candle from "./assets/candle";

export default function Home() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showHearts, setShowHearts] = useState(false);
    const [celebrateMode, setCelebrateMode] = useState(false);
    const [candleLit, setCandleLit] = useState(false);
    const [images, setImages] = useState([]);
    const [galleryPage, setGalleryPage] = useState(0);
    const imagesPerPage = 5;
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Fetch image list from public directory
    useEffect(() => {
        async function fetchImages() {
            try {
                // This assumes you have an API endpoint to get the list of images
                // You'll need to create this endpoint (explained below)
                const response = await fetch("/api/images");
                const data = await response.json();
                if (data.images && Array.isArray(data.images)) {
                    setImages(data.images);
                }
            } catch (error) {
                console.error("Failed to fetch images:", error);
            }
        }

        fetchImages();
    }, []);

    // Function to handle candle lighting
    const lightCandle = () => {
        setCandleLit(true);
        setTimeout(() => {
            setIsLoaded(true);
        }, 1500);
    };

    useEffect(() => {
        if (images.length === 0) return;

        // Auto-rotate images
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        // Add periodic heart animations
        const heartInterval = setInterval(() => {
            setShowHearts(true);
            setTimeout(() => setShowHearts(false), 3000);
        }, 15000);

        return () => {
            clearInterval(interval);
            clearInterval(heartInterval);
        };
    }, [images]);

    // Function to trigger celebration mode
    const triggerCelebration = () => {
        setCelebrateMode(true);
        setTimeout(() => setCelebrateMode(false), 4000);
    };

    // Handle image navigation
    const goToPrevImage = useCallback(
        (e) => {
            if (e) e.stopPropagation();
            if (images.length === 0) return;
            setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        },
        [images]
    );

    const goToNextImage = useCallback(
        (e) => {
            if (e) e.stopPropagation();
            if (images.length === 0) return;
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        },
        [images]
    );

    // Calculate total pages needed
    const totalPages = Math.ceil(images.length / imagesPerPage);

    // Function to change gallery page
    const changeGalleryPage = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setGalleryPage(newPage);
        }
    };

    // Function to check scroll position and show/hide scroll-to-top button
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 500);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <main className="min-h-screen flex flex-col items-center relative bg-[var(--color-pink-2)]">
            {/* Animated background elements - reduced opacity for better text visibility */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-[var(--color-pink-4)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-96 -right-24 w-96 h-96 bg-[var(--color-pink-3)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-24 left-1/2 w-96 h-96 bg-[var(--color-pink-5)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Floating hearts animation */}
            {showHearts && (
                <div className="fixed inset-0 pointer-events-none z-20">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute text-4xl animate-float"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDuration: `${3 + Math.random() * 3}s`,
                                animationDelay: `${Math.random() * 0.5}s`,
                                transform: `scale(${0.5 + Math.random()})`,
                                color: [
                                    "var(--color-pink-2)",
                                    "var(--color-pink-3)",
                                    "var(--color-pink-4)",
                                    "var(--color-pink-5)",
                                ][Math.floor(Math.random() * 4)],
                            }}
                        >
                            ❤️
                        </div>
                    ))}
                </div>
            )}

            {/* Celebration confetti */}
            {celebrateMode && (
                <div className="fixed inset-0 pointer-events-none z-20">
                    {Array.from({ length: 60 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-confetti"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `-5%`,
                                width: `${5 + Math.random() * 7}px`,
                                height: `${5 + Math.random() * 7}px`,
                                backgroundColor: [
                                    "var(--color-pink-1)",
                                    "var(--color-pink-2)",
                                    "var(--color-pink-3)",
                                    "var(--color-pink-4)",
                                    "var(--color-pink-5)",
                                ][Math.floor(Math.random() * 5)],
                                animationDuration: `${2 + Math.random() * 3}s`,
                                animationDelay: `${Math.random() * 0.5}s`,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Loading animation with candle */}
            {!isLoaded && (
                <div className="fixed inset-0 flex flex-col items-center justify-start pt-16 md:pt-24 z-50 bg-[#2c2026]/95">
                    {/* Instruction text at the top */}
                    <div className="text-white text-2xl md:text-3xl font-bold bg-[var(--color-pink-5)]/70 px-6 py-2 rounded-full shadow-lg mb-6">
                        Click the candle to light it
                    </div>

                    {/* Happy Birthday text that appears when candle is lit */}
                    <div
                        className={`my-6 text-center transition-all duration-1000 ${
                            candleLit ? "opacity-100 scale-100" : "opacity-0 scale-50"
                        }`}
                    >
                        <div className="text-4xl text-[var(--color-pink-3)] font-bold font-['var(--font-dancing-script)'] animate-bounce">
                            Happy Birthday Sally!
                        </div>
                    </div>

                    {/* Candle container */}
                    <div className="flex-1 flex items-center justify-center">
                        <div
                            className={`relative cursor-pointer transform transition-all duration-700 hover:scale-110 ${
                                candleLit ? "animate-float-up" : ""
                            }`}
                            onClick={!candleLit ? lightCandle : undefined}
                        >
                            {/* Candle on cake */}
                            <Candle isLit={candleLit} />

                            {/* Birthday Message */}
                            <div
                                className={`mt-12 text-center text-2xl text-white font-['var(--font-dancing-script)'] transition-opacity duration-1000 ${
                                    candleLit ? "opacity-100" : "opacity-0"
                                }`}
                            >
                                {candleLit ? "Making a birthday wish for Sally..." : ""}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Content container */}
            <div
                className={`z-10 w-full max-w-7xl p-4 md:p-8 transition-opacity duration-1000 ${
                    isLoaded ? "opacity-100" : "opacity-0"
                }`}
            >
                {/* Header */}
                <header className="text-center my-8 md:my-12">
                    <div className="inline-block relative cursor-pointer" onClick={triggerCelebration}>
                        <h1 className="text-5xl md:text-7xl font-bold text-[#2c2026] mb-4 relative z-10 font-['var(--font-dancing-script)']">
                            Happy Birthday Sally!
                        </h1>
                        <div className="absolute -bottom-2 left-0 right-0 h-4 bg-[var(--color-pink-6)] opacity-70 -rotate-1 z-0"></div>
                    </div>
                    <p className="text-xl md:text-2xl text-[#2c2026] mt-4 font-bold">
                        To the most amazing girlfriend in the world...
                    </p>
                </header>

                {/* Main content - side by side but vertical orientation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-6xl mx-auto main-image-section">
                    {/* Main feature photo - vertical */}
                    <div className="rounded-2xl overflow-hidden shadow-xl h-[90vh] md:h-[80vh] relative border-8 border-white rotate-1 transform transition-transform hover:rotate-0 duration-300 group">
                        {images.length > 0 ? (
                            images.map((src, index) => (
                                <Image
                                    key={src}
                                    src={src}
                                    alt={`Sally and me ${index + 1}`}
                                    fill
                                    priority={index === 0}
                                    className={`object-cover object-center transition-opacity duration-1000 ${
                                        currentImageIndex === index ? "opacity-100" : "opacity-0"
                                    }`}
                                />
                            ))
                        ) : (
                            <div className="flex items-center justify-center h-full bg-[var(--color-pink-1)]">
                                <p className="text-[var(--color-pink-6)] text-xl">Loading images...</p>
                            </div>
                        )}

                        {/* Navigation buttons - only show if we have images */}
                        {images.length > 0 && (
                            <>
                                <button
                                    onClick={goToPrevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white w-12 h-12 rounded-full flex items-center justify-center z-10 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 shadow-lg hover:scale-110 active:scale-95"
                                    aria-label="Previous photo"
                                >
                                    <LeftArrow className="w-6 h-6 text-[var(--color-pink-6)]" />
                                </button>

                                <button
                                    onClick={goToNextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white w-12 h-12 rounded-full flex items-center justify-center z-10 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 shadow-lg hover:scale-110 active:scale-95"
                                    aria-label="Next photo"
                                >
                                    <RightArrow className="w-6 h-6 text-[var(--color-pink-6)]" />
                                </button>
                            </>
                        )}

                        {/* Photo caption */}
                        {images.length > 0 && (
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                                <p className="text-lg font-medium">Our memories together</p>
                                <div className="flex mt-2 gap-2 flex-wrap max-w-full overflow-hidden">
                                    {images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`w-2.5 h-2.5 rounded-full transition-all ${
                                                currentImageIndex === index ? "bg-white scale-125" : "bg-white/50"
                                            }`}
                                            aria-label={`Go to image ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Birthday message - vertical */}
                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg h-auto max-h-[90vh] md:max-h-[80vh] flex flex-col justify-start -rotate-1 transform transition-transform hover:rotate-0 duration-300 overflow-y-auto relative">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#2c2026] mb-6 font-['var(--font-dancing-script)']">
                            Xin chào Ma Chérie,
                        </h2>
                        <div className="space-y-6 text-lg text-[#2c2026] pb-4">
                            <p>
                                Hôm nay là ngày sinh nhật của em, đầu tiên thì anh muốn nói lời chúc mừng sinh nhật đến
                                mẹ trẻ cụa anh. Tuổi mới, anh chúc em đầu tiên phải thật luôn mạnh khỏe, để ý hơn đến
                                bản thân và sức khỏe của mình. Sau đó thì anh mong em phải luôn vui vẻ, hạnh phúc và bớt
                                những lo âu trong cuộc sống, tận hưởng cái mình làm. Sau nữa thì là thành công trong con
                                đường mà em chọn. Cuối cùng và cũng rất quan trọng đó là em phải iu anh thật nhiều nhiều
                                nhiều nhiều nhiều nhiều nhiều nhiều...
                            </p>
                            <p>
                                Có thể em nghĩ rằng là, mình càng lớn thì cái sinh nhật nó không còn là cái gì quá là
                                quan trọng nữa, không cần thứ gì đó nhất thiết phải cầu kì phức tạp. Thế nhưng mà em ơi,
                                sinh nhật mình là ngày đặc biệt của mình, là ngày lễ của em. Anh cũng không biết phải
                                diễn tả như thế nào nữa nhưng mà anh thấy ngày sinh nhật nó linh thiêng thế nào ý. Thế
                                nên là dù có là sinh nhật lần thứ 22, 23,... hay là 100, thì anh vẫn muốn em có một ngày
                                sinh nhật đặc biệt nhất. Mỗi năm có 1 kiểu đặc biệt riêng của nó, vậy nên hãy vui vẻ và
                                hạnh phúc nhóoo.
                            </p>
                            <p>
                                Anh làm cho em cái này là muốn em có 1 tấm thiệp sinh nhật mà anh cả anh lẫn em đều có
                                thể xem, hoặc em có thể đi khoe với bạn em là ui người iu tao giỏi vãi nho, làm cho tao
                                cái này xinh vãi cớt. Kiểu kiểu zậy, và anh muốn em có 1 thứ gì đó đặc biệt để lưu giữ
                                sau nhìn lại và thấy nó có ý nghĩa hihi.
                            </p>
                            <p>
                                Viết đến đây cũng dài dài rồi nên là anh muốn chúc em bé iu của anh có 1 ngày sinh nhật
                                tuyệt vời nhất, và hạnh phúc nhất nhé. Anh yêu em nhiều lắm lắm lắm lắm lắm lắm lắm!
                                Mong em cũng yêu anh nhiều lắm lắm lắm lắm lắm lắm lắm! Good night my love. Đi ngủ sớm
                                nhé em.
                            </p>
                            <p
                                className="font-bold text-[var(--color-pink-6)] text-xl font-['var(--font-dancing-script)'] cursor-pointer"
                                onClick={() => setShowHearts(true)}
                            >
                                I love you more than words can express. Happy Birthday! ❤️
                            </p>
                        </div>

                        {/* Scroll indicator */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
                            <p className="text-[var(--color-pink-5)] text-sm mb-1">Scroll for more</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-[var(--color-pink-5)]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Photo gallery */}
                <h3 className="text-2xl font-semibold text-center mb-6 text-[#2c2026] font-['var(--font-dancing-script)']">
                    Our Photo Gallery
                </h3>

                {/* More compact gallery with pagination logic */}
                <div className="mb-12 max-w-6xl mx-auto">
                    {images.length > 0 ? (
                        <>
                            {/* Gallery grid - showing limited images per page */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-4">
                                {images
                                    .slice(galleryPage * imagesPerPage, (galleryPage + 1) * imagesPerPage)
                                    .map((src, idx) => {
                                        const index = galleryPage * imagesPerPage + idx;
                                        return (
                                            <div
                                                key={src}
                                                className={`relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 ${
                                                    currentImageIndex === index
                                                        ? "ring-4 ring-[var(--color-pink-6)] scale-105"
                                                        : ""
                                                }`}
                                                onClick={() => {
                                                    setCurrentImageIndex(index);
                                                    // Scroll to main image section - changed to scroll to top
                                                    document
                                                        .querySelector(".main-image-section")
                                                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                                                }}
                                            >
                                                <Image
                                                    src={src}
                                                    alt={`Photo ${index + 1}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                                                    <div className="absolute bottom-2 left-2 text-white text-sm">
                                                        Photo {index + 1}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>

                            {/* Pagination controls - only show if there are multiple pages */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-3 mt-4">
                                    <button
                                        onClick={() => changeGalleryPage(galleryPage - 1)}
                                        disabled={galleryPage === 0}
                                        className={`px-3 py-1 rounded-full ${
                                            galleryPage === 0
                                                ? "bg-gray-200 text-gray-500"
                                                : "bg-[var(--color-pink-4)] text-white hover:bg-[var(--color-pink-5)]"
                                        }`}
                                    >
                                        Previous
                                    </button>

                                    <span className="text-[#2c2026]">
                                        Page {galleryPage + 1} of {totalPages}
                                    </span>

                                    <button
                                        onClick={() => changeGalleryPage(galleryPage + 1)}
                                        disabled={galleryPage === totalPages - 1}
                                        className={`px-3 py-1 rounded-full ${
                                            galleryPage === totalPages - 1
                                                ? "bg-gray-200 text-gray-500"
                                                : "bg-[var(--color-pink-4)] text-white hover:bg-[var(--color-pink-5)]"
                                        }`}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}

                            {/* Scroll to top button */}
                            <div
                                className={`fixed bottom-8 right-8 transition-all duration-300 ${
                                    showScrollTop ? "opacity-100 scale-100" : "opacity-0 scale-0"
                                }`}
                            >
                                <button
                                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                    className="bg-[var(--color-pink-5)] hover:bg-[var(--color-pink-6)] text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
                                    aria-label="Scroll to top"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-[var(--color-pink-6)] text-xl">Loading images...</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <footer className="w-full text-center p-6 text-sm text-[#2c2026] font-semibold z-10 mt-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="h-px w-24 bg-[var(--color-pink-4)] mb-4"></div>
                    <p>Made with ❤️ for the one I love - Sally</p>
                </div>
            </footer>

            {/* Add CSS for animations */}
            <style jsx global>{`
                @keyframes blob {
                    0% {
                        transform: translate(0px, 0px) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                    100% {
                        transform: translate(0px, 0px) scale(1);
                    }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }

                @keyframes float {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100vh) rotate(45deg);
                        opacity: 0;
                    }
                }
                .animate-float {
                    animation: float 3s ease-in forwards;
                }

                @keyframes confetti {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotate(720deg);
                        opacity: 0;
                    }
                }
                .animate-confetti {
                    animation: confetti 3s ease-in forwards;
                }

                @keyframes flicker {
                    0%,
                    100% {
                        transform: scale(1) translateY(0);
                        opacity: 0.9;
                    }
                    25% {
                        transform: scale(1.1) translateY(-2px);
                        opacity: 1;
                    }
                    50% {
                        transform: scale(0.9) translateY(1px);
                        opacity: 0.8;
                    }
                    75% {
                        transform: scale(1.05) translateY(-1px);
                        opacity: 0.95;
                    }
                }
                .animate-flicker {
                    animation: flicker 1.5s infinite;
                }

                @keyframes flicker-fast {
                    0%,
                    100% {
                        transform: scale(1) translateY(0);
                        opacity: 0.6;
                    }
                    25% {
                        transform: scale(1.2) translateY(-1px);
                        opacity: 0.8;
                    }
                    50% {
                        transform: scale(0.8) translateY(1px);
                        opacity: 0.5;
                    }
                    75% {
                        transform: scale(1.1) translateY(-1px);
                        opacity: 0.7;
                    }
                }
                .animate-flicker-fast {
                    animation: flicker-fast 0.8s infinite;
                }

                @keyframes float-up {
                    0% {
                        transform: translateY(0);
                    }
                    100% {
                        transform: translateY(-20px);
                    }
                }
                .animate-float-up {
                    animation: float-up 1.5s forwards;
                }
            `}</style>
        </main>
    );
}
