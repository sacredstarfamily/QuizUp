export type UserType = {
    first_name: string,
    last_name: string,
    email: string,
    password: string
}
export type UserFormDataType = {
    email: string,
    first_name: string,
    last_name: string,
    password: string
}
export type QuestionType = {
    answer: string,
    author: string,
    created_on: string,
    question: string,
    id: number
}
export type QuestionFormDataType = {
    question: string,
    answer: string
 }
export type CategoryType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'

export type TokenType = {
    token:string,
    tokenExpiration:string
}