export interface Post {
    email: string,
    member_id: number,
    name: string,
    picture_link: string,
    total:number
}

export interface Posts {
payment_list: Post[];
}