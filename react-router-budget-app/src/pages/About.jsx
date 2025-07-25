// rrd imports 
import { useLoaderData } from 'react-router-dom';
import { openModalId ,useEffect, useState } from 'react';
//helper functions
import { fetchData } from '../helpers';

// loader
export function aboutLoader() {
    const userName = fetchData("userName");
    return { userName };
}

const About = () => {
    const { userName } = useLoaderData()

    /// !-------------------------------- Cook o phan nay ----------------------------------- ///
    // return (

        // Function to open a modal
        const openModal = (id) => {
            setOpenModalId(id);
            document.body.style.overflow = 'hidden'; // Prevent scrolling background
        };

    // Function to close a modal
    const closeModal = () => {
        setOpenModalId(null);
        document.body.style.overflow = ''; // Restore scrolling
    };

    // Effect for handling Escape key to close modals
    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };

        document.addEventListener('keydown', handleEscapeKey);

        // Cleanup the event listener when the component unmounts
        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, []) // Empty dependency array means this effect runs once on mount and cleans up on unmount

    // Modal Overlay Component
    const ModalOverlay = ({ id, isOpen, onClose, children }) => {
        if (!isOpen) return null;

        return (
            <div
                id={id}
                className={`modal-overlay ${isOpen ? 'open' : ''}`}
                onClick={(e) => {
                    // Only close if clicking on the overlay itself, not the content
                    if (e.target.id === id) {
                        onClose();
                    }
                }}
            >
                <div className="modal-content">
                    <button className="close-button" onClick={onClose}>&times;</button>
                    {children}
                </div>
            </div>
        );
    }

    return (
        <div className=" text-gray-800 bg-white min-h-screen flex flex-col items-center justify-center p-4">
            {/* Tailwind CSS and Google Fonts are loaded via CDN in the HTML head, so no explicit import needed here */}
            <style jsx>{`
                body {
                    font-family: 'Inter', sans-serif;
                    background-color: #f0f2f5; /* Light gray background */
                }
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.7);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity 0.3s ease, visibility 0.3s ease;
                }
                .modal-overlay.open {
                    opacity: 1;
                    visibility: visible;
                }
                .modal-content {
                    background-color: white;
                    padding: 1.5rem;
                    border-radius: 0.75rem; /* rounded-xl */
                    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1); /* shadow-xl */
                    max-width: 90%;
                    max-height: 90%;
                    overflow-y: auto;
                    position: relative;
                    transform: translateY(-20px);
                    transition: transform 0.3s ease;
                }
                .modal-overlay.open .modal-content {
                    transform: translateY(0);
                }
                .close-button {
                    position: absolute;
                    top: 0.75rem;
                    right: 0.75rem;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #4b5563; /* gray-600 */
                    transition: color 0.2s ease;
                }
                .close-button:hover {
                    color: #1f2937; /* gray-900 */
                }
            `}</style>

            <div className="justify-center container mx-auto p-4 sm:p-6 lg:p-8">

                {/* Header Section */}
                <header className="text-center py-10 bg-white rounded-xl shadow-md mb-8">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-indigo-700 mb-4">About Us</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover our journey, values, and the people behind our success.</p>
                </header>

                {/* Our Story Section */}
                <section className="bg-white p-6 sm:p-8 rounded-xl shadow-md mb-8">
                    <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">Our Story</h2>
                    <div className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-700">
                        <p className="mb-4">
                            Founded with a vision to revolutionize the industry, our company began its journey in [Year of Founding]. From humble beginnings, we've grown into a dynamic team dedicated to innovation, excellence, and delivering unparalleled value to our customers.
                        </p>
                        <p className="mb-4">
                            Our commitment to [mention a core value, e.g., "customer satisfaction" or "sustainable practices"] has been the cornerstone of our operations. We believe in fostering a collaborative environment where creativity thrives and challenges are met with ingenious solutions.
                        </p>
                        <p>
                            Today, we continue to push boundaries, striving to create products and services that not only meet but exceed expectations, making a positive impact on the world.
                        </p>
                    </div>
                </section>

                {/* Meet Our Team Section */}
                <section className="bg-white p-6 sm:p-8 rounded-xl shadow-md mb-8">
                    <h2 className="text-3xl font-bold text-indigo-600 mb-8 text-center">Meet Our Team</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

                        {/* CEO - Van Ngoc Card */}
                        <div className="team-card bg-indigo-50 p-6 rounded-xl shadow-lg flex flex-col items-center text-center">
                            <img src="https://placehold.co/150x150/6366f1/ffffff?text=Van+Ngoc" alt="Van Ngoc - CEO" className="w-36 h-36 rounded-full object-cover mb-4 border-4 border-indigo-300 shadow-md" />
                            <h3 className="text-2xl font-semibold text-indigo-700">Van Ngoc</h3>
                            <p className="text-lg text-gray-600 mb-3">Chief Executive Officer (CEO)</p>
                            <p className="text-gray-700 mb-4 flex-grow">
                                Van Ngoc is the visionary leader steering our company towards new horizons. With a deep understanding of market dynamics and a passion for innovation...
                            </p>
                            <button
                                className="read-more-btn bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
                                onClick={() => openModal('van-ngoc-modal')}
                            >
                                Read More
                            </button>
                        </div>

                        {/* CTO - Tan Tai Card */}
                        <div className="team-card bg-indigo-50 p-6 rounded-xl shadow-lg flex flex-col items-center text-center">
                            <img src="https://placehold.co/150x150/6366f1/ffffff?text=Tan+Tai" alt="Tan Tai - CTO" className="w-36 h-36 rounded-full object-cover mb-4 border-4 border-indigo-300 shadow-md" />
                            <h3 className="text-2xl font-semibold text-indigo-700">Tan Tai</h3>
                            <p className="text-lg text-gray-600 mb-3">Chief Technology Officer (CTO)</p>
                            <p className="text-gray-700 mb-4 flex-grow">
                                Tan Tai leads our technological advancements, transforming complex ideas into robust and scalable solutions. His expertise in cutting-edge technologies...
                            </p>
                            <button
                                className="read-more-btn bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
                                onClick={() => openModal('tan-tai-modal')}
                            >
                                Read More
                            </button>
                        </div>

                    </div>
                </section>

                {/* Footer Section */}
                <footer className="text-center py-6 text-gray-500 text-sm">
                    &copy; 2025 Your Company Name. All rights reserved.
                </footer>

            </div>
            <ModalOverlay id="van-ngoc-modal" isOpen={openModalId === 'van-ngoc-modal'} onClose={closeModal}>
                <h3 className="text-3xl font-bold text-indigo-700 mb-4">Van Ngoc - CEO</h3>
                <img src="" alt="Van Ngoc - CEO" className="w-24 h-24 rounded-full object-cover mb-4 mx-auto border-2 border-indigo-300 shadow-sm" />
                <p className="text-gray-700 text-lg leading-relaxed">
                    Van Ngoc is the driving force behind [Your Company Name]'s strategic vision and growth. With over 20 years of experience in the [Your Industry] sector, Van Ngoc has a proven track record of leading successful ventures, fostering innovation, and building high-performing teams. Before founding [Your Company Name], Van Ngoc held key leadership roles at [Previous Company 1] and [Previous Company 2], where [mention a significant achievement or area of expertise]. Van Ngoc's leadership is characterized by a commitment to excellence, a deep understanding of market trends, and an unwavering dedication to customer success. Under Van Ngoc's guidance, [Your Company Name] has achieved [mention a key achievement, e.g., "significant market share" or "launched groundbreaking products"].
                </p>
            </ModalOverlay>

            {/* Tan Tai Modal */}
            <ModalOverlay id="tan-tai-modal" isOpen={openModalId === 'tan-tai-modal'} onClose={closeModal}>
                <h3 className="text-3xl font-bold text-indigo-700 mb-4">Tan Tai - CTO</h3>
                <img src="" alt="Tan Tai - CTO" className="w-24 h-24 rounded-full object-cover mb-4 mx-auto border-2 border-indigo-300 shadow-sm" />
                <p className="text-gray-700 text-lg leading-relaxed">
                    Tan Tai is the technological architect of [Your Company Name], responsible for spearheading our product development and innovation roadmap. With a profound expertise in [mention specific technologies, e.g., "AI, machine learning, and cloud computing"], Tan Tai translates complex technical challenges into elegant and scalable solutions. Prior to joining [Your Company Name], Tan Tai served as [Previous Role] at [Previous Company], where [mention a significant technical achievement]. Tan Tai is passionate about leveraging cutting-edge technology to solve real-world problems and is committed to building robust, secure, and user-centric platforms. Tan Tai's leadership ensures that our technological infrastructure remains at the forefront of the industry, enabling us to deliver exceptional digital experiences.
                </p>
            </ModalOverlay>
        </div>
    );
}
  /// -------------------------------- Cook o phan nay -----------------------------------! ///
export default About;