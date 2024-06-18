import React, { useState, useEffect } from 'react';
import service from '../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({ $id, tittle, featuredImage }) {
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const previewURL = await service.filePreview(featuredImage);
                setImageSrc(previewURL);
            } catch (error) {
                console.log("Error fetching image preview:", error);
            }
        };

        if (featuredImage) {
            fetchImage();
        }
    }, [featuredImage]);

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    {imageSrc && (
                        <img
                            src={imageSrc}
                            alt={tittle}
                            className='rounded-xl'
                        />
                    )}
                </div>
                <h2 className='text-xl font-bold'>{tittle}</h2>
            </div>
        </Link>
    );
}

export default PostCard;
