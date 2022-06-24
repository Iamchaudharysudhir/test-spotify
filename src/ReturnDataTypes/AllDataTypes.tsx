export interface AlbumCardType{
    name:string,
    release_date:string,
    total_tracks:number,
    images:[
        {
            url:string,
        }
    ],
    id:string,
    external_urls:{
        spotify:string,
    },
    artists:[
        {
            name:string,
            external_urls:{
                spotify:string,
            }
        }
    ],
}

// export interface AlbumCardType{[{
//     id:string;
//     name: string;
//     artists: {
//         id: string;
//         name: string;

//             }[],
//     album: {
//     id: string;
//     name: string;
//     images: {
//         url: string;
//         width: number;
//         height: number;
//             }[],
//     total_tracks: number;
//     release_date: string;
//         },
//     popularity: number;
//     external_urls: {
//         spotify: string;
//     }
// }]}


export interface FeaturedPlaylistType{

    description: string;
            external_urls: {
                spotify: string;
            };
            id: string;
            images: {
                height: number;
                url: string;
                width: number;
            }[];
            name: string;
            owner: {
                display_name: string;
                external_urls: {
                    spotify: string;
                };
                href: string;
                id: string;
                type: string;
            };
            tracks: {
                href: string;
                total: number;
            };
            type: string;

}

export interface latestAlbumType{
    id: string;
        name: string;
        artists: {
            id: string;
            name: string;
        }[];
        popularity: number;
        external_urls: {
            spotify: string;
        };
        images: {
            url: string;
            width: number;
            height: number;
        }[];
        release_date: string;
        total_tracks: number;
}

export default AlbumCardType;

