import axios from 'axios';
import { QuestionType, UserFormDataType, UserType, TokenType } from '../types';
import { QuestionFormDataType } from '../types/index';


const baseURL:string = 'https://cae-bookstore.herokuapp.com'
const userEndpoint:string = '/user'
const quizAllEndpoint:string = '/question/all'
const loginEndpoint:string = '/login'
const quizEndpoint:string = '/question'

const apiClientNoAuth = () => axios.create({
    baseURL: baseURL
})
const apiClientBasicAuth = (email:string, password:string) => axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: 'Basic ' + btoa(email + ':' + password)
    }
})
const apiClientTokenAuth = (token:string) => axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: 'Bearer ' + token
    }
})
type APIResponse<T> = {
    data?: T,
    error?: string
}

async function register(newUserData:UserFormDataType): Promise<APIResponse<UserType>> {
    let data;
    let error;
    try{
        console.log(newUserData);
        const response = await apiClientNoAuth().post(userEndpoint, newUserData);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function login(email:string, password:string): Promise<APIResponse<TokenType>> {
    let data;
    let error;
    try{
        
        const response = await apiClientBasicAuth(email, password).get(loginEndpoint)
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function getAllQuizQs(): Promise<APIResponse<QuestionType[]>> {
    let data;
    let error;
    try{
        const response = await apiClientNoAuth().get(quizAllEndpoint);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}
async function getUserQuestions(token:string): Promise<APIResponse<QuestionType[]>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).get(quizEndpoint);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function editQuestionById(token:string,questionId, question:QuestionFormDataType): Promise<APIResponse<QuestionType>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).put(quizEndpoint + '/' + questionId, question);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}
async function getQuestionById(token:string, questionId:number): Promise<APIResponse<QuestionType>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).get(quizEndpoint + '/' + questionId);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }

}
async function createQuestion(token:string, question:QuestionType): Promise<APIResponse<QuestionType>> {
    let data;
    let error;
    const newQuestion = {"question": question.question, "answer": question.answer}
    try{
        const response = await apiClientTokenAuth(token).post(quizEndpoint, newQuestion);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }

}
async function deleteQuestionById(token:string, questionId:number): Promise<APIResponse<QuestionType>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).delete(quizEndpoint + '/' + questionId);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

export {
    register,
    login,
    getAllQuizQs,
    getUserQuestions,
    createQuestion,
    getQuestionById,
    editQuestionById,
    deleteQuestionById
}
