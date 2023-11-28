import { useRouter } from 'next/navigation';
import React from 'react'

export default function Pubs({publication, index}) {
    const router = useRouter();

    const handleRedirect = (publication) => {
        router.push(publication.doi_link);
    }

    if (index != 0) {
        return (
            <React.Fragment>
                    <div className="card" href="google.com" onClick={() => handleRedirect(publication)}>
                        <figure>
                            <img src="/Images/Home2.jpg" alt="aaa" />
                        </figure>
                        <div className="contenido">
                            <p className="date">{publication.CreatedAt.toString().substring(0,10)}</p>
                            <h3 className="new_title">{publication.title}</h3>
                            <p className="category abstract">{publication.abstract.length > 400 ? publication.abstract.substring(0,400) + "..." : publication.abstract}</p>
                        </div>
                    </div>
            </React.Fragment>
        )
    }
}