export interface User {
    administrator: number,
    money:any  ,
    check:boolean,
            date_time: string,
            gm_id: number,
            group_id: number,
            member: {
                access_token: number,
                address: string,
                birth: string,
                date_time: string,
                email: string,
                firebase_token: string,
                gender: number,
                junk_food: string,
                lunch_time: string,
                member_id: number,
                name:string,
                nick_name: string,
                picture_link: string
            },
            member_id: number
            
}

export interface Group{
        date_time: string
        group_id: number,
        group_name: string,
        member_count: number,
        picture_link: string,
        team_name: string
}

export interface PaymentList {
    group_list:Group,
    user_list: User
}